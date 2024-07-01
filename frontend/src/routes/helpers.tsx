import { redirect } from "react-router-dom";

export const isAllowed = async (token: string | null | undefined) => {
    const permissions = token;
    if (!permissions) {
        redirect("/");
    }
    return null;
};