# 🚀 Daily Space Explorer — Backend API

> A Node.js REST API powering **Daily Space Explorer**, a mobile app built with MIT App Inventor that turns real-time NASA data into an engaging, visual space experience.

---

## About the Project

**Daily Space Explorer** was built as the final project for **La Academia Espacial 2025**, a national STEM summer program in Mexico. Out of ~600 participants, I was one of **60 selected** to advance to the in-person stage — which included visits to:

-  **GE Aerospace**
-  **CENTA** (Centro Nacional de Tecnologías Aeronáuticas)
-  **UNAQ & UTEQ** (Universities in Querétaro)
-  **UNAM Instituto de Geociencias – Unidad de Alta Tecnología**
-  **Gomez Morin**

The program covered courses in MIT App Inventor, Arduino, AI for Learning, and a session hosted by **Space Center Houston**.

The app answers one powerful question: **"What's happening right now in space and on Earth?"** — combining astronomy, planetary exploration, near-Earth objects, and natural Earth events into a single, unified mobile experience.

---

## App Breakdown

### 1. Astronomy Picture of the Day (APOD)
The home screen centerpiece. Displays NASA's daily featured space image with its title, date, and explanation. Gives the app fresh content every single day.

<img width="343" height="646" alt="image" src="https://github.com/user-attachments/assets/ffd38b55-3ba4-49f1-b796-7749d15fb87b" />

---

### 2. Mars Gallery
An interactive gallery of real images from Mars rovers (Curiosity, Perseverance, and others). Users can filter by rover, browse using navigation controls, and view metadata like the camera used, Earth date, and Martian sol number.

<img width="295" height="593" alt="image" src="https://github.com/user-attachments/assets/c4374041-6c80-47dd-9d66-da9d2721bf8d" />

---

### 3. Asteroid Watch
Displays near-Earth asteroids approaching Earth in real time, including their distance, size, and velocity. Features a **custom canvas visualizer** where Earth is fixed on screen and asteroids are dynamically positioned and scaled based on actual data — giving users an intuitive feel for spatial relationships in space.

<img width="315" height="578" alt="image" src="https://github.com/user-attachments/assets/7ec7a34c-802f-4850-8f09-13e8fe76be6a" />

---

### 4. Earth Events (EONET)
Tracks natural events happening around the world right now — wildfires 🔥, storms 🌀, volcanoes 🌋, ice events 🧊, and more. Features a hybrid interface with a scrollable event list and an interactive map with markers. Complex geometry arrays are parsed on the backend to extract the latest event location and convert coordinates into the format MIT App Inventor expects.

<img width="307" height="578" alt="image" src="https://github.com/user-attachments/assets/539aabf7-0aad-46ea-8254-c7ecf4b3c3f0" />

---

### Link to YT video. App Walkthrough in Spanish

https://youtube.com/shorts/S2lbJzngjzk

--- 

## How the App Uses This API

The MIT App Inventor app communicates with this Express server via simple GET requests. The backend handles all the heavy lifting — NASA API calls, JSON parsing, data normalization, and translation — and returns clean, app-ready JSON.

### Endpoints

| Endpoint | NASA Source | Description |
|---|---|---|
| `GET /APOD?lan=` | [APOD API](https://api.nasa.gov/) | Returns today's Astronomy Picture of the Day |
| `GET /NeoWs?lan=` | [NeoWs API](https://api.nasa.gov/) | Returns near-Earth asteroids sorted by size, distance, and velocity |
| `GET /EONET?lan=` | [EONET API](https://eonet.gsfc.nasa.gov/) | Returns recent natural Earth events (last 7 days, up to 20 events) |

### Language Parameter (`lan`)
All endpoints accept a `lan` query parameter to support bilingual output:
- `lan=1` → English
- `lan=2` → Spanish (titles and explanations are auto-translated)

### Example Request & Response

```http
GET /APOD?lan=1
```

```json
{
  "url": "https://apod.nasa.gov/apod/image/...",
  "title": "The Orion Nebula",
  "explanation": "...",
  "copyright": "NASA/ESA",
  "media_type": "image"
}
```

```http
GET /NeoWs?lan=2
```

```json
{
  "s": [ /* sorted by size */
    {
      "name": "(2025 BX1)",
      "size": 142,
      "dist": 1203450,
      "vel": 54321,
      "ready4use": "☄️(2025 BX1) - Tamaño: 142 m - Distancia: 1203450 km - Velocidad: 54321 km/h",
      "url": "https://ssd.jpl.nasa.gov/..."
    }
  ],
  "c": [ /* sorted by distance */ ],
  "f": [ /* sorted by velocity */ ]
}
```

```http
GET /EONET?lan=1
```

```json
[
  {
    "title": "Canada Wildfires",
    "date": "Date: 2025-07-15\n at 14:22:00",
    "magnitude": "Magnitude: 35.2 acres",
    "coordinates": "Coordinates: [-115.2, 52.4]",
    "categories": "🔥 Wildfire",
    "txt4List": "Canada Wildfires(🔥 Wildfire) - (2025-07-15)"
  }
]
```

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **APIs:** NASA APOD, NeoWs, EONET (via `https` module)
- **Translation:** [`translate`](https://www.npmjs.com/package/translate) npm package
- **Config:** `dotenv` for API key management

---

## Project Structure

```
├── app.js          # Express server & route definitions
├── test.js         # NASA API integrations & data processing logic
├── .env            # API keys (not committed)
└── package.json
```

---

## Recognition

This project was developed as part of **La Academia Espacial 2025**, a national STEM program. Selected from ~600 applicants, I was among **60 finalists** who participated in an in-person program featuring industry visits across the aerospace and technology sector in Mexico.

The app was evaluated on:
- ✅ Thematic relevance to the aerospace/aeronautical industry
- ✅ Technical functionality & MIT App Inventor usage
- ✅ Creativity & innovation
- ✅ User experience & interface design
- ✅ Real-world impact & educational value
