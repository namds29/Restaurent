import { createContext, useEffect, useState } from "react";

export const AppContext = createContext<any>({});

export const AppProvider = ({ children }: any) => {
    const [userData, setUserData] = useState();
    const [avatar, setAvatar] = useState<string | null>();
    const getDetailUser = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/user`, {
                credentials: "include",
            });

            if (res.ok) {
                const data = await res.json();
                setAvatar(data.picture)
                setUserData(data);
            } else {
                console.error(`Error: ${res.status} - ${res.statusText}`);
            }
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getDetailUser();
    }, [avatar])
    return <>
        <AppContext.Provider value={{userData, avatar, setAvatar}}>
            {children}
        </AppContext.Provider>
    </>
}