export const getPhStatus = (ph)=>{
    if(ph === undefined || ph === null){
        return "Unknown";
    }

    if(ph < 5.5 ){
        return "Acidic";
    }

    if(ph <= 7.5 ){
        return "Near Neutral";
    }

    return "Alkaline";
};

export const getMoistureStatus = (moisture)=>{
    if(moisture === undefined || moisture === null){
        return "Undefined"; 
    }

    if(moisture < 30){
        return "Low";
    }

    if(moisture <= 70 ){
        return "Moderate";
    }

    return "High";
};

