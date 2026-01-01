// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title IMedIntelAdapter
 * @notice MedIntel → Chain submission boundary
 */
interface IMedIntelAdapter {
    function submitSafetySignal(
        bytes32 signalHash,
        string calldata signalType,
        bool emergencyFlag
    ) external;
}

