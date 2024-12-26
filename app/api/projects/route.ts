import { Container } from "@/src/infrastructure/container/container";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const searchQuery = request?.nextUrl?.searchParams.get("search") || "";
		const userId = request?.nextUrl?.searchParams.get("userId") || "";
		const projectService =
			Container.getInstance().resolve("ProjectService");
		const projects = await projectService.findProjectsByQuery(
			searchQuery,
			userId
		);
		if (!projects || projects.length === 0) {
			return NextResponse.json({ projects: [] }, { status: 200 });
		}
		return NextResponse.json({ projects }, { status: 200 });
	} catch (error) {
		console.error("Project search error:", error);
		return NextResponse.json(
			{ error: "Failed to search projects" },
			{ status: 500 }
		);
	}
}
