// import { useContext, createContext, useEffect, useState } from "react";
// import axios from "axios";
// import { useEcom } from "../ecom-context/ecom-context";

// const DatabaseContext = createContext()


// export function DatabaseProvider({ children }) {
//     const [data, setData] = useState([])
//     return (
//         <DatabaseContext.Provider value={{ data }}>
//             {children}
//         </DatabaseContext.Provider>
//     )

// }

// export function useDatabase() {
//     return useContext(DatabaseContext)
// }