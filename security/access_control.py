"""
Security audit module for MedIntel.
Runs automated scans using Bandit to detect vulnerabilities in Python code.
Enhanced for integration, reporting, and CI/CD pipelines.
"""

import os
import logging
import subprocess
import json
from typing import Dict, List, Optional
from pathlib import Path

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Constants
BANDIT_CONFIG_FILE = "bandit.yaml"  # Optional config file for custom rules
AUDIT_REPORT_DIR = "security/reports"  # Directory for audit reports
AUDIT_ENABLED = os.getenv("MEDINTEL_AUDIT_ENABLED", "true").lower() == "true"

class AuditError(Exception):
    """Base class for audit exceptions"""
    pass

class BanditNotFoundError(AuditError):
    """Raised when Bandit is not installed"""
    pass

def check_bandit_installation() -> bool:
    """
    Check if Bandit is installed and accessible.

    Returns:
        True if installed, False otherwise

    Raises:
        BanditNotFoundError: If Bandit is not found
    """
    try:
        result = subprocess.run(
            ["bandit", "--version"],
            capture_output=True,
            text=True,
            timeout=10
        )
        if result.returncode == 0:
            logger.info(f"Bandit version: {result.stdout.strip()}")
            return True
        else:
            raise BanditNotFoundError("Bandit command failed")
    except FileNotFoundError:
        raise BanditNotFoundError(
            "Bandit not found. Install with: pip install bandit"
        )

def run_bandit_scan(
    target_path: str = ".",
    config_file: Optional[str] = None,
    output_format: str = "json",
    severity_level: str = "medium"
) -> Dict:
    """
    Run Bandit security scan on the target path.

    Args:
        target_path: Path to scan (default: current directory)
        config_file: Optional Bandit config file
        output_format: Output format ('json', 'txt', 'html')
        severity_level: Minimum severity to report ('low', 'medium', 'high')

    Returns:
        Dictionary containing scan results

    Raises:
        AuditError: If scan fails
    """
    if not AUDIT_ENABLED:
        logger.info("Audits disabled via environment variable")
        return {"disabled": True}

    check_bandit_installation()

    cmd = ["bandit", "-r", target_path, "-f", output_format, "-l", severity_level]
    if config_file and Path(config_file).exists():
        cmd.extend(["-c", config_file])

    try:
        logger.info(f"Running Bandit scan on {target_path}")
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            timeout=300  # 5-minute timeout
        )

        if result.returncode not in [0, 1]:  # 0 = no issues, 1 = issues found
            raise AuditError(f"Bandit scan failed: {result.stderr}")

        # Parse JSON output
        if output_format == "json":
            scan_results = json.loads(result.stdout)
        else:
            scan_results = {"output": result.stdout, "errors": result.stderr}

        logger.info(f"Bandit scan completed. Issues found: {scan_results.get('metrics', {}).get('total_issues', 'N/A')}")
        return scan_results

    except subprocess.TimeoutExpired:
        raise AuditError("Bandit scan timed out")
    except json.JSONDecodeError:
        raise AuditError("Failed to parse Bandit output")

def generate_audit_report(scan_results: Dict, report_file: Optional[str] = None) -> str:
    """
    Generate a human-readable audit report from scan results.

    Args:
        scan_results: Results from run_bandit_scan
        report_file: Optional file to save report

    Returns:
        Report as string
    """
    if scan_results.get("disabled"):
        report = "Security audits are disabled."
    else:
        total_issues = scan_results.get("metrics", {}).get("total_issues", 0)
        high_severity = scan_results.get("metrics", {}).get("SEVERITY.HIGH", 0)
        medium_severity = scan_results.get("metrics", {}).get("SEVERITY.MEDIUM", 0)

        report = f"""
Security Audit Report
=====================

Total Issues Found: {total_issues}
High Severity: {high_severity}
Medium Severity: {medium_severity}

Recommendations:
"""
        if high_severity > 0:
            report += "- Address high-severity issues immediately (e.g., hardcoded secrets, injection vulnerabilities).\n"
        if medium_severity > 0:
            report += "- Review medium-severity issues (e.g., weak cryptography, unused imports).\n"
        if total_issues == 0:
            report += "- No issues found. Code appears secure.\n"

        # Add details of issues
        if "results" in scan_results:
            for filename, issues in scan_results["results"].items():
                if issues:
                    report += f"\nFile: {filename}\n"
                    for issue in issues:
                        report += f"  - {issue['test_name']}: {issue['issue_text']} (Line {issue['line_number']})\n"

    if report_file:
        Path(AUDIT_REPORT_DIR).mkdir(exist_ok=True)
        with open(f"{AUDIT_REPORT_DIR}/{report_file}", "w") as f:
            f.write(report)
        logger.info(f"Report saved to {AUDIT_REPORT_DIR}/{report_file}")

    return report

def audit_medintel_repo(
    target_path: str = ".",
    report_file: str = "audit_report.txt"
) -> str:
    """
    Run a full audit on the MedIntel repo.

    Args:
        target_path: Path to audit
        report_file: Name of report file

    Returns:
        Audit report as string
    """
    try:
        scan_results = run_bandit_scan(target_path)
        report = generate_audit_report(scan_results, report_file)
        logger.info("MedIntel audit completed successfully")
        return report
    except AuditError as e:
        error_msg = f"Audit failed: {str(e)}"
        logger.error(error_msg)
        return error_msg

if __name__ == "__main__":
    # Example usage (for testing only)
    logger.warning("TEST MODE - Run in production for real audits")

    try:
        report = audit_medintel_repo()
        print("Audit Report:")
        print(report)
    except Exception as e:
        logger.error(f"Audit script failed: {str(e)}")
