"use server";

const AUTH_COOKIES = {
	ACCESS_TOKEN: "accessToken",
	REFRESH_TOKEN: "refreshToken",
};

import { cookies } from "next/headers";

export const setAuthCookies = async (
	accessToken: string,
	refreshToken: string
) => {
	const cookieStore = await cookies();
	cookieStore.set({
		name: AUTH_COOKIES.ACCESS_TOKEN,
		value: accessToken,
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		maxAge: 60 * 60, // 1 hour
	});

	cookieStore.set({
		name: AUTH_COOKIES.REFRESH_TOKEN,
		value: refreshToken,
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		maxAge: 7 * 24 * 60 * 60, // 7 days
	});
};

export const getAuthCookies = async () => {
	const cookieStore = await cookies();
	return {
		accessToken: cookieStore.get(AUTH_COOKIES.ACCESS_TOKEN)?.value,
		refreshToken: cookieStore.get(AUTH_COOKIES.REFRESH_TOKEN)?.value,
	};
};

export const removeAuthCookies = async () => {
	const cookieStore = await cookies();

	cookieStore.delete(AUTH_COOKIES.ACCESS_TOKEN);
	cookieStore.delete(AUTH_COOKIES.REFRESH_TOKEN);
};
