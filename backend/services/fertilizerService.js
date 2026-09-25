const getNutrientStatus = (value, nutrient) => {
    /*
     * These are simplified educational thresholds
     * for application demonstration.
     *
     * They are NOT universal agronomic fertilizer
     * recommendations.
     */

    if (value === undefined || value === null) {
        return "Unknown";
    }

    if (nutrient === "nitrogen") {
        if (value < 40) return "Low";
        if (value <= 80) return "Moderate";
        return "High";
    }

    if (nutrient === "phosphorus") {
        if (value < 20) return "Low";
        if (value <= 40) return "Moderate";
        return "High";
    }

    if (nutrient === "potassium") {
        if (value < 20) return "Low";
        if (value <= 40) return "Moderate";
        return "High";
    }

    return "Unknown";
};


const generateFertilizerGuidance = ({
    nitrogen,
    phosphorus,
    potassium,
    ph,
}) => {
    const nitrogenStatus = getNutrientStatus(
        nitrogen,
        "nitrogen"
    );

    const phosphorusStatus = getNutrientStatus(
        phosphorus,
        "phosphorus"
    );

    const potassiumStatus = getNutrientStatus(
        potassium,
        "potassium"
    );

    const guidance = [];

    if (nitrogenStatus === "Low") {
        guidance.push(
            "Nitrogen appears low. Consider crop-specific nitrogen management based on soil testing and local agricultural recommendations."
        );
    } else if (nitrogenStatus === "Moderate") {
        guidance.push(
            "Nitrogen is in a moderate range. Maintain balanced nutrient management."
        );
    } else {
        guidance.push(
            "Nitrogen is in a relatively high range. Avoid unnecessary nitrogen application."
        );
    }

    if (phosphorusStatus === "Low") {
        guidance.push(
            "Phosphorus appears low. Consider phosphorus management according to crop requirements and soil-test recommendations."
        );
    } else if (phosphorusStatus === "Moderate") {
        guidance.push(
            "Phosphorus is in a moderate range. Maintain balanced nutrient management."
        );
    } else {
        guidance.push(
            "Phosphorus is in a relatively high range. Avoid unnecessary phosphorus application."
        );
    }

    if (potassiumStatus === "Low") {
        guidance.push(
            "Potassium appears low. Consider potassium management according to crop requirements and soil-test recommendations."
        );
    } else if (potassiumStatus === "Moderate") {
        guidance.push(
            "Potassium is in a moderate range. Maintain balanced nutrient management."
        );
    } else {
        guidance.push(
            "Potassium is in a relatively high range. Avoid unnecessary potassium application."
        );
    }

    if (ph < 5.5) {
        guidance.push(
            "Soil pH is acidic. Consider professional soil-management advice before applying amendments."
        );
    } else if (ph <= 7.5) {
        guidance.push(
            "Soil pH is near neutral."
        );
    } else {
        guidance.push(
            "Soil pH is alkaline. Consider professional soil-management advice before applying amendments."
        );
    }

    guidance.push(
        "Use crop-specific fertilizer recommendations and local soil-test guidance before making application decisions."
    );

    return {
        nutrientStatus: {
            nitrogen: nitrogenStatus,
            phosphorus: phosphorusStatus,
            potassium: potassiumStatus,
        },
        guidance,
    };
};


module.exports = {
    getNutrientStatus,
    generateFertilizerGuidance,
};