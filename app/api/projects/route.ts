import { Container } from "@/src/infrastructure/container/container";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const SEARCH_QUERY = request?.nextUrl?.searchParams.get("search") || "";
		const USER_ID = request?.nextUrl?.searchParams.get("userId") || "";
		const projectService =
			Container.getInstance().resolve("ProjectService");
		const PROJECTS_BY_QUERY = await projectService.findProjectsByQuery(
			SEARCH_QUERY,
			USER_ID
		);
		if (!PROJECTS_BY_QUERY || PROJECTS_BY_QUERY.length === 0) {
			return NextResponse.json({ projects: [] }, { status: 200 });
		}
		return NextResponse.json(
			{ projects: PROJECTS_BY_QUERY },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Project search error:", error);
		return NextResponse.json(
			{ error: "Failed to search projects" },
			{ status: 500 }
		);
	}
}
