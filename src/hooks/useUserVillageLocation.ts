// import { useEffect, useState } from 'react';

// export type Village = {
//   id: number;
//   name: string;
// };

// export const villages: Village[] = [
//   { id: 1, name: 'Majhawalia' },
//   { id: 2, name: 'Saghwalia' },
//   { id: 3, name: 'Basudevpur' },
//   { id: 4, name: 'Saraia' },
//   { id: 5, name: 'Basdila' },
//   { id: 6, name: 'Narouli Bhism' },
//   { id: 7, name: 'Pipar Patti' },
//   { id: 8, name: 'Belwa' },
//   { id: 9, name: 'Radi' },
//   { id: 10, name: 'Tadawa Tola' },
//   { id: 11, name: 'SabarmatiTaluka' },
//   { id: 12, name: 'SabarmatiTaluk' },
// ];

// export const useUserVillageLocation = () => {
//   const [locationName, setLocationName] = useState<string | null>(null);
//   const [matchedVillage, setMatchedVillage] = useState<Village | null>(null);
//   const [geoLoading, setGeoLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const savedVillageId = localStorage.getItem('manual-village-id');
//     if (savedVillageId) {
//       const savedVillage = villages.find(v => v.id === Number(savedVillageId));
//       if (savedVillage) {
//         setMatchedVillage(savedVillage);
//         setGeoLoading(false);
//         return;
//       }
//     }

//     // Fallback: use geolocation
//     const fetchLocation = async () => {
//       try {
//         const pos = await getUserLocation();
//         const name = await reverseGeocode(
//           pos.coords.latitude,
//           pos.coords.longitude
//         );
//         setLocationName(name);
//         const match = matchVillage(name);
//         setMatchedVillage(match || null);
//       } catch (err: any) {
//         setError(err.message || 'Location fetch error');
//       } finally {
//         setGeoLoading(false);
//       }
//     };

//     fetchLocation();
//   }, []);

//   // ✅ Request geolocation with high accuracy
//   const getUserLocation = (): Promise<GeolocationPosition> => {
//     return new Promise((resolve, reject) => {
//       if (!navigator.geolocation) {
//         reject(new Error('Geolocation is not supported by your browser'));
//       }
//       navigator.geolocation.getCurrentPosition(
//         resolve,
//         reject,
//         { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
//       );
//     });
//   };

//   // ✅ Reverse geocoding to get village or town name
//  const reverseGeocode = async (lat: number, lon: number): Promise<string> => {
//   const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
//   const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;

//   const res = await fetch(proxyUrl);
//   const data = await res.json();
//    console.log(data)
//   return (
//     data.address?.village ||
//     data.address?.town ||
//     data.address?.city ||
//     data.address?.county ||
//     'Unknown'
//   );
// };

//   // ✅ Try to match village with service list
//   const matchVillage = (name: string): Village | undefined => {
//     return villages.find(v =>
//       v.name.toLowerCase().includes(name.toLowerCase())
//     );
//   };

//   return {
//     locationName,
//     matchedVillage,
//     geoLoading,
//     error,
//     isInServiceArea: Boolean(matchedVillage),
//     allVillages: villages,
//     setMatchedVillage,
//   };
// };
