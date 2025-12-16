from models.rpm_assessor import RPMPostOpAssessor

def handle_post_op_request(case_id: int, patient_data: dict):
    """
    Simulates handling of an on-chain PostOpMonitoringRequested event.
    """

    assessor = RPMPostOpAssessor()
    assessment = assessor.assess(patient_data)

    return {
        "case_id": case_id,
        "assessment": assessment
    }


# Example simulation
if __name__ == "__main__":
    simulated_patient_data = {
        "heart_rate": 118,
        "oxygen_saturation": 91,
        "temperature": 38.2
    }

    result = handle_post_op_request(
        case_id=1,
        patient_data=simulated_patient_data
    )

    print(result)

