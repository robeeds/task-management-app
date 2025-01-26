"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Page() {
    const [error, setError] = useState<string | null>(null);
    let userId : string | null;
    let secret : string | null;
    const router = useRouter();

    // Gathers userId and secret to pass to verification api
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        userId = (params.get('userId'));
        secret = (params.get('secret'));
    }, []);


    const handleClick = async() => {

        const url = `/api/verify?userId=${userId}&secret=${secret}`;
        
        try {
            const res = await fetch(url, {
                method: "POST",
            });

            const data = await res.json();
            console.log("/verify/page.tsx", data)
            
            if (res.status == 200) {
                console.log("Successful Verification")
                router.push("/dashboard");
            } else {
                console.log("Unsuccessful Verification")
                setError(data.error);
            }
        } catch (err) {
            console.log("Unsuccessful verification", err)
            setError("Something went wrong. Please try again")
        }
    }

    return (
        <div className="grid items-center justify-items-center min-h-screen p-8">
            {/* This will be the main card */}
            <div className="flex flex-col items-center font-semibold">
            <p className="pb-4">Verify your email address</p>
            <motion.button
                whileHover={{ scale: 1.1 }}
                className="flex flex-1 justify-between bg-lime py-2 px-4 rounded-full text-background"
                onClick={handleClick}
            >
                <p className="pr-4">Verify</p>
                <p>{"->"}</p>
            </motion.button>

            {/* Error Message */}
            {error && <div className="text-red-500 pt-4">{error}</div>}

            </div>
        </div>
    );
}
