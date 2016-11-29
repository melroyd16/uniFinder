SPARQL_ENDPOINT = "http://alfred.ngrok.io/Group13DB_v2.2/query?query=";
QUERY_POSTFIX = "&format=json";
PREFIXES = "PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
    "PREFIX xsd:<http://www.w3.org/2001/XMLSchema#> " +
    "PREFIX univ:<http://www.semanticweb.org/group13/University#> ";

function SEARCH_UNIVERSITIES(uniName, minMinTemp, maxMinTemp, minMaxTemp, maxMaxTemp, minMeanTemp, maxMeanTemp, filterLocation, stateCodes, minTotalSnowfall, maxTotalSnowfall, minTotalRainfall, maxTotalRainfall) {
    return SPARQL_ENDPOINT + encodeURIComponent(PREFIXES +
            "SELECT ?univ_id ?univ_name ?loc_name WHERE { ?univ a univ:University;" +
            "univ:name ?univ_name; " +
            "univ:id ?univ_id; " +
            "univ:hasLocation ?loc. ?loc a univ:Location; " +
            "univ:name ?loc_name; " +
            "univ:hasClimate ?cli. ?cli univ:hasSeasonalData ?x. ?x a univ:AnnualClimate; " +
            "univ:minTemp ?minAnnualTemp; " +
            "univ:maxTemp ?maxAnnualTemp; " +
            "univ:meanTemp ?meanAnnualTemp; " +
            "univ:avgSnowfall ?totalSnowfall; " +
            "univ:avgRainfall ?totalRainfall. " +
            "FILTER(regex(?univ_name, '" + uniName + "') && " + append_location_filter(filterLocation, stateCodes) +
            "xsd:decimal(?minAnnualTemp) >= " + minMinTemp + "&& xsd:decimal(?minAnnualTemp) <= " + maxMinTemp + " && " +
            "xsd:decimal(?maxAnnualTemp) >= " + minMaxTemp + "&& xsd:decimal(?maxAnnualTemp) <= " + maxMaxTemp + " && " +
            "xsd:decimal(?meanAnnualTemp) >= " + minMeanTemp + "&& xsd:decimal(?meanAnnualTemp) <= " + maxMeanTemp + " && " +
            "xsd:decimal(?totalSnowfall) >= " + minTotalSnowfall + "&& xsd:decimal(?totalSnowfall) <= " + maxTotalSnowfall + " && " +
            "xsd:decimal(?totalRainfall) >= " + minTotalRainfall + "&& xsd:decimal(?totalRainfall) <= " + maxTotalRainfall + ")" +
            "}") +
        QUERY_POSTFIX
}



function GET_UNIVERSITY_CLIMATE(code) {
    return SPARQL_ENDPOINT + encodeURIComponent(PREFIXES +
            "SELECT * " +
            "WHERE { ?loc univ:name ?loc_name; " +
            "univ:hasClimate ?cli. ?cli univ:hasSeasonalData ?season. ?season univ:avgRainfall ?total_rainfall; " +
            "univ:avgSnowfall ?total_snowfall; " +
            "univ:avgWind ?total_wind; " +
            "univ:minTemp ?minTemp; " +
            "univ:maxTemp ?maxTemp; " +
            "univ:meanTemp ?meanTemp. " +
            "FILTER( ?season = univ:" + code + ")" +
            "}") +
        QUERY_POSTFIX
}

function GET_GENERAL_UNIVERSITY_DETAILS(code) {
    return SPARQL_ENDPOINT + encodeURIComponent(PREFIXES +
            "SELECT * " + 
            "WHERE { ?U a univ:University; " + 
                "univ:id ?univ_id; " +
                "univ:name ?univ_name; " + 
                "univ:street_address ?street; " +
                "univ:state ?state; " +
                "univ:zip ?zip; " +
                "univ:alias ?alias; " +
                "univ:control ?control; " +
                "univ:internetWebsite ?internetWebsite; " +
                "univ:financialAidOfficeWebsite ?financialAidOfficeWebsite; " +
                "univ:admissionOfficeWebsite ?admissionOfficeWebsite; " +
                "univ:applicationWebsite ?applicationWebsite; " +
                "univ:opeTitle ?opeTitle; " +
                "univ:sector ?sector; " +
                "univ:level ?level; " +
                "univ:longitude ?longitude; " +
                "univ:latitude ?latitude. " +
                "FILTER( ?univ_id = '" + code + "' && strlen(?zip)=5)" + 
            "}") +
        QUERY_POSTFIX
}



function append_location_filter(filterLocation, stateCodes) {
    if (filterLocation) {
        return "?loc_name IN (" + stateCodes + ") && ";
    } else {
        return "";
    }
}
