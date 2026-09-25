const getMoistureStatus = (moisture) => {
    if (
        moisture === undefined ||
        moisture === null ||
        Number.isNaN(Number(moisture))
    ) {
        return "Unknown";
    }

    const value = Number(moisture);

    if (value < 30) {
        return "Low";
    }

    if (value <= 70) {
        return "Moderate";
    }

    return "High";
};


const generateIrrigationGuidance = ({
    moisture,
    temperature,
    humidity,
    currentCrop,
    irrigationSource,
}) => {
    const moistureStatus =
        getMoistureStatus(moisture);

    const guidance = [];

    if (moistureStatus === "Low") {
        guidance.push(
            "Soil moisture is relatively low. Monitor the field and consider irrigation according to crop stage, soil condition, and local recommendations."
        );
    }

    if (moistureStatus === "Moderate") {
        guidance.push(
            "Soil moisture is in a moderate range. Continue monitoring the field before making the next irrigation decision."
        );
    }

    if (moistureStatus === "High") {
        guidance.push(
            "Soil moisture is relatively high. Avoid unnecessary irrigation and monitor for excessive soil moisture."
        );
    }

    if (temperature >= 35) {
        guidance.push(
            "Temperature is relatively high. Monitor crop and soil conditions more frequently."
        );
    } else if (temperature >= 25) {
        guidance.push(
            "Temperature is in a moderate-to-warm range. Continue regular monitoring."
        );
    } else {
        guidance.push(
            "Temperature is relatively mild. Continue monitoring according to crop and field conditions."
        );
    }

    if (humidity < 40) {
        guidance.push(
            "Relative humidity is relatively low, so field moisture conditions should be monitored regularly."
        );
    } else if (humidity > 80) {
        guidance.push(
            "Relative humidity is relatively high. Monitor field conditions and avoid unnecessary irrigation."
        );
    }

    if (currentCrop) {
        guidance.push(
            `Current crop recorded for this farm: ${currentCrop}. Irrigation decisions should also consider crop growth stage and local agronomic guidance.`
        );
    }

    if (irrigationSource) {
        guidance.push(
            `Recorded irrigation source: ${irrigationSource}.`
        );
    }

    guidance.push(
        "This result is decision-support information and should not be treated as an automatic irrigation schedule."
    );

    return {
        moistureStatus,
        guidance,
    };
};


module.exports = {
    getMoistureStatus,
    generateIrrigationGuidance,
};