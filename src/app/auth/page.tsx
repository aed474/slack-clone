"use client"
import {useQuery} from "convex/react";
import {api} from "../../../convex/_generated/api";
import {AuthScreen} from "@/features/auth/components/auth-screen";

const AuthPage = () => {
    return (
        <AuthScreen/>
    );
};

export default AuthPage;