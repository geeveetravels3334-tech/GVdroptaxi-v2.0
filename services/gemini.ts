
import { GoogleGenAI } from "@google/genai";

export async function getTripAdvice(prompt: string) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: `You are an expert travel assistant for 'Tamilnadu Taxi Tours'. 
        Your specialty is identifying specific attractions, 'hidden gems', popular temples, scenic viewpoints, and authentic food stops specifically ALONG the highway routes in Tamil Nadu.
        
        Guidelines:
        1. When a user provides a route (e.g., Chennai to Madurai), provide a structured itinerary of 3-5 specific stops along that route.
        2. For each stop, explain WHY it's worth visiting.
        3. Mention approximate travel time between major points if relevant.
        4. Use clear formatting: Use bold text for place names and bullet points for stops.
        5. Always maintain a professional, helpful, and inviting tone.
        6. Keep responses concise enough to fit comfortably in a chat window but detailed enough to be useful.`,
        temperature: 0.7,
        tools: [{ googleSearch: {} }]
      },
    });

    const links: { title: string; uri: string }[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.web) {
          links.push({ title: chunk.web.title || 'Source', uri: chunk.web.uri });
        }
      });
    }

    return { text: response.text, links };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { text: "I'm sorry, I'm having trouble planning your route right now. Please call our 24/7 support line for immediate assistance.", links: [] };
  }
}

export async function getTripAdviceWithMaps(prompt: string, location?: { latitude: number, longitude: number }) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const config: any = {
      tools: [{ googleMaps: {} }, { googleSearch: {} }],
      systemInstruction: `You are an elite travel concierge for 'Tamilnadu Taxi Tours'. 
      Use Google Maps data to provide specific, up-to-date recommendations for places, restaurants, and attractions in Tamil Nadu.
      If the user is asking about nearby things, prioritize their current location if provided.
      ALWAYS mention that Tamilnadu Taxi Tours can provide a comfortable taxi to these locations.
      Format your response with clear Markdown. List any relevant place URLs provided by the tools.`
    };

    if (location) {
      config.toolConfig = {
        retrievalConfig: {
          latLng: {
            latitude: location.latitude,
            longitude: location.longitude
          }
        }
      };
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: config
    });

    const links: { title: string; uri: string }[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.maps) {
          links.push({ title: chunk.maps.title || 'View on Maps', uri: chunk.maps.uri });
        } else if (chunk.web) {
          links.push({ title: chunk.web.title || 'Source', uri: chunk.web.uri });
        }
      });
    }

    return { text: response.text, links };
  } catch (error) {
    console.error("Gemini Maps API Error:", error);
    return { text: "I encountered an error fetching real-time map data. Please try again or call our support.", links: [] };
  }
}

export async function generateVehicleImage(vehicleName: string, vehicleType: string) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `A professional studio photograph of a clean, white ${vehicleName} ${vehicleType} taxi for Tamilnadu Taxi Tours. Side view, high-end automotive photography, clean background.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
           aspectRatio: "4:3",
        }
      }
    });

    if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData && part.inlineData.data) {
                return `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
            }
        }
    }
    
    return null;
  } catch (error) {
    console.error("Image Generation Error:", error);
    return null;
  }
}
