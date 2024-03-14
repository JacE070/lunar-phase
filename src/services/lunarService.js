import axios from 'axios';

const API_KEY = '3694e463a322528827e7fb2983d0ca5b3ec757990ad8df7857cb5ea4e283ed24e711e70f44c198bc1d37013311270571a73fae71df893909476900f5ce228b98767156af95d9b7d4c867515bd902e5585958e612c3c8fbe31bfb0f2989a334239c1d05d4ba8a73e997a1ef8a66010abe'; // Replace with your actual API key
const APP_ID = '543a8d98-162f-4854-b08f-06d89b93b858'
const API_URL = 'https://api.astronomyapi.com/api/v2/studio/moon-phase';

export const getLunarData = async (latitude, longitude, date) => {
  try {
    const authString = btoa(`${APP_ID}:${API_KEY}`);
    const observer = {
        latitude: latitude,
        longitude: longitude,
        date: date
    };
    const view = {
        type: 'portrait-simple',
        // orientation: "south-up"
        parameters: {}
    };
    const style = {
        "moonStyle": "default",
        "backgroundStyle": "stars",
        "backgroundColor": "red",
        "headingColor": "white",
        "textColor": "white"
    }
    const data = {
        observer: observer,
        view: view,
        style: style
    }
    const response = await axios.post(API_URL, data, {
        headers: {
            'Authorization': `Basic ${authString}`
        }
    });
    return response.data.data; // Transform and return the data as needed
  } catch (error) {
    throw error;
  }
};
