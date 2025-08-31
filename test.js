import https from "https";
import translate from 'translate';
import dotenv from 'dotenv/config';
const NASA_API_KEY = process.env.NASA_API_KEY;

const make_frienly = {
    "drought": "🌵 Drought / Dry Conditions",
    "dustHaze": "🌫️ Dust Storm / Haze",
    "earthquakes": "🌍 Earthquake",
    "floods": "🌊 Flood",
    "landslides": "🏔️ Landslide",
    "manmade": "🏭 Human Activity / Pollution",
    "seaLakeIce": "🧊 Iceberg / Sea Ice Event",
    "severeStorms": "🌀 Severe Storm / Cyclone",
    "snow": "❄️ Snow Event",
    "tempExtremes": "🌡️ Extreme Heat / Cold",
    "volcanoes": "🌋 Volcanic Eruption",
    "waterColor": "💧 Ocean / Water Change",
    "wildfires": "🔥 Wildfire"
}

const make_frienly_es = {
    "drought": "🌵 Sequía / Condiciones Secas",
    "dustHaze": "🌫️ Tormenta de Polvo / Neblina",
    "earthquakes": "🌍 Terremoto",
    "floods": "🌊 Inundación",
    "landslides": "🏔️ Deslizamiento de Tierra",
    "manmade": "🏭 Actividad Humana / Contaminación",
    "seaLakeIce": "🧊 Iceberg / Evento de Hielo Marino",
    "severeStorms": "🌀 Tormenta Severa / Ciclón",
    "snow": "❄️ Evento de Nieve",
    "tempExtremes": "🌡️ Calor / Frío Extremo",
    "volcanoes": "🌋 Erupción Volcánica",
    "waterColor": "💧 Cambio en el Agua / Océano",
    "wildfires": "🔥 Incendio Forestal"
}

export const idkFu = (async (lan) => {
    return new Promise((resolve, reject) => {
            const agent = new https.Agent({family: 4});
            const req = https.get(
                'https://eonet.gsfc.nasa.gov/api/v3/events?days=7&limit=20',
                { agent,timeout: 5000  },
                res => {
                    let data = '';

                    res.on('data', chunk => {
                        data += chunk;
                    });

                    res.on('end', async () => {
                        try {
                            const jsonResponse = JSON.parse(data);

                            let ans = [];
                            if(lan == 1){
                                for (const element of jsonResponse.events) {
                                    let categoriesArr = [];
                                    element.categories.forEach((c) => {
                                        categoriesArr.push(make_frienly[c.id]);
                                    });

                                    let date, coordinates, magnitude
                                    for(const idk of element.geometry){
                                        if(!date || date < idk.date){
                                            date = idk.data;
                                            coordinates = idk.coordinates
                                            if(idk.magnitudeValue && idk.magnitudeUnit) magnitude = `${idk.magnitudeValue} ${idk.magnitudeUnit}`
                                        }
                                    }

                                    const [thing_date, timeFull] = date.split("T");
                                    const time = timeFull?.slice(0, -1);
                                    
                                    ans.push({
                                        title: element.title,
                                        date: `Date: ${thing_date}\n at ${time}`,
                                        magnitude: magnitude ? `Magnitude: ${magnitude}` : "unknown",
                                        description: element.description || "No description",
                                        coordinates: `Coordinates: ${coordinates}`,
                                        categories: categoriesArr.join("\n"),
                                        txt4List: `${element.title}(${categories[0]}) - (${thing_date})`
                                    });
                                }
                            }
                            else{
                                for (const element of jsonResponse.events){
                                    let categoriesArr = [];
                                    element.categories.forEach((c) => {
                                        categoriesArr.push(make_frienly_es[c.id]);
                                    });

                                    let date, coordinates, magnitude
                                    for (const idk of element.geometry){
                                        if(!date || date < idk.date){
                                            date = idk.data;
                                            coordinates = idk.coordinates
                                            if(idk.magnitudeValue && idk.magnitudeUnit) magnitude = `${idk.magnitudeValue} ${idk.magnitudeUnit}`
                                        }
                                    }

                                    const [thing_date, timeFull] = date.split("T");
                                    const time = timeFull?.slice(0, -1);
                                    ans.push({
                                        title: await translate(element.title, {to: "es"}),
                                        date: `Fecha: ${thing_date}\n a las ${time}`,
                                        magnitude: `Magnitud: ${magnitude}` || "unknown",
                                        description: element.description ? await translate(element.description, { to: "es" }) : "No hay descripción",
                                        coordinates: `Coordenadas: ${coordinates}`,
                                        categories: categoriesArr.join("\n"),
                                        txt4List: `${element.title}(${categoriesArr[0]}) - (${thing_date})`
                                    });
                                };
                            }

                            resolve({ ans });
                        } 
                        catch (e) {
                            resolve({ ans: null});
                        }
                    });
                }
            )
            req.on("error", (err) => {
                console.error("EONET request failed:", err.message);
                resolve({ ans: null });
            });

            // Handle timeout explicitly
            req.on("timeout", () => {
                console.error("EONET request timed out");
                req.destroy();
                resolve({ ans: null });
            });   
    })
});

export const idkFu2 = ( async (lan) => {
    
    return new Promise((resolve, reject) => {
        try {
            const today = new Date();
            const whatIneed = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

            const agent = new https.Agent({family: 4});
            https.get(
                `https://api.nasa.gov/neo/rest/v1/feed?start_date=${whatIneed}&limit=10&api_key=${NASA_API_KEY}`,
                { agent },
                res => {
                    let data = '';

                    res.on('data', chunk => {
                        data += chunk;
                    });

                    res.on('end', () => {
                        try {
                            const jsonResponse = JSON.parse(data);
                            const temp = [];

                            jsonResponse.near_earth_objects["2025-09-02"].forEach(element => {

                                let date, vel, dist
                                element.close_approach_data.forEach(idk => {
                                    if(!date){
                                        date = idk.close_approach_date;
                                        vel = idk.relative_velocity.kilometers_per_hour;
                                        dist = idk.miss_distance.kilometers
                                    }
                                    else if(date < idk.date){
                                        date = idk.close_approach_date;
                                        vel = idk.relative_velocity.kilometers_per_hour;
                                        dist = idk.miss_distance.kilometers
                                    }
                                })

                                const size = Math.round(element.estimated_diameter.meters.estimated_diameter_max);
                                const final_d = Math.round(dist);
                                const final_v = Math.round(vel);

                                temp.push({
                                    size: size,
                                    dist: final_d,
                                    vel: final_v,
                                    name: element.name,
                                    url: element.nasa_jpl_url,
                                    ready4use: lan == 1 ? `☄️${element.name}  - Size: ${size} m - Distance: ${final_d} km - Speed: ${final_v} km/h`:`☄️${element.name}  - Tamaño: ${size} m - Distancia: ${final_d} km - Velocidad: ${final_v} km/h`
                                });
                            });

                            const s = temp.slice().sort((a, b) => b.size - a.size);
                            const c = temp.slice().sort((a, b) => b.dist - a.dist);
                            const f = temp.slice().sort((a, b) => b.vel - a.vel);

                            resolve({ ans: {s ,c, f} });
                        } 
                        catch (e) {
                            resolve({ ans: null});
                        }
                    });
                }
            )
        } 
        catch (error) {
            resolve({ ans: null});
        }
    })
})

export const idkFu3 = (async (lan) => {
    return new Promise((resolve, reject) => {
        try{
            const agent = new https.Agent({family: 4});
            https.get(
                `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`,
                { agent },
                res => {
                    let data = '';

                    res.on('data', chunk => {
                        data += chunk;
                    });

                    res.on('end', async () => {
                        try {
                            const jsonResponse = JSON.parse(data);
                            let ans = {};

                            if(jsonResponse.media_type == "video"){
                                ans = {
                                    url: jsonResponse.thumbnail_url,
                                    copyright: jsonResponse.copyright | (lan == 1 ? "Not found":"No se encontró"),
                                    title: jsonResponse.title | (lan == 1 ? "Not found":"No se encontró"),
                                    explanation: jsonResponse.explanation | (lan == 1 ? "Not found":"No se encontró"),
                                    media_type :jsonResponse.media_type
                                }

                                if(!ans.copyright){
                                    ans.copyright =(lan == 1 ? "Not found":"No se encontró");
                                }
                                if(!ans.title){
                                    ans.title = (lan == 1 ? "Not found":"No se encontró");
                                }
                                if(!ans.explanation){
                                    ans.explanation = (lan == 1 ? "Not found":"No se encontró");
                                }

                            }
                            else if(jsonResponse.media_type == "image"){
                                ans = {
                                    url: jsonResponse.url,
                                    copyright: jsonResponse.copyright | (lan == 1 ? "Not found":"No se encontró"),
                                    title: jsonResponse.title | (lan == 1 ? "Not found":"No se encontró"),
                                    explanation: jsonResponse.explanation | (lan == 1 ? "Not found":"No se encontró"),
                                    media_type :jsonResponse.media_type
                                }
                            }
                            else{
                                ans = {
                                    title: "Andromeda Galaxy",
                                    copyright: "NASA/JPL/California Institute of Technology",
                                    explanation: (lan == 1 ? "This image is from NASA Galaxy Evolution Explorer is an observation of the large galaxy in Andromeda, Messier 31. The Andromeda galaxy is the most massive in the local group of galaxies that includes our Milky Way.": "Esta imagen del Explorador de Evolución de Galaxias de la NASA es una observación de la gran galaxia en Andrómeda, Messier 31. La galaxia de Andrómeda es la más masiva del grupo local de galaxias que incluye a nuestra Vía Láctea."),
                                    media_type :jsonResponse.media_type,
                                }
                            }

                            if(lan == 2){
                                if(ans.title) ans.title = await translate(ans.title, {to: "es"})
                                if(ans.explanation) ans.explanation = await translate(ans.explanation, {to: "es"})
                            }

                            if(!ans.copyright){
                                    ans.copyright =(lan == 1 ? "Not found":"No se encontró");
                                }
                                if(!ans.title){
                                    ans.title = (lan == 1 ? "Not found":"No se encontró");
                                }
                                if(!ans.explanation){
                                    ans.explanation = (lan == 1 ? "Not found":"No se encontró");
                                }

                            resolve({ ans });
                        } 
                        catch (e) {
                            console.error('Error parsing JSON:', e);
                            resolve({ ans: null});
                        }
                    });
                }
            )
        } 
        catch (error) {
            console.log(error);
            resolve({ ans: null});
       }
    })
});
