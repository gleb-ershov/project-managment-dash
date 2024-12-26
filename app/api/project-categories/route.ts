import { Container } from "@/src/infrastructure/container/container";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const searchQuery = request?.nextUrl?.searchParams.get("search") || "";
		const projectCategoryService = Container.getInstance().resolve(
			"ProjectCategoryService"
		);
		const categories = await projectCategoryService.findCategoriesByQuery(
			searchQuery
		);
		if (!categories || categories.length === 0) {
			return NextResponse.json({ categories: [] }, { status: 200 });
		}

		return NextResponse.json({ categories }, { status: 200 });
	} catch (error) {
		console.error("Project search error:", error);
		return NextResponse.json(
			{ error: "Failed to search project categories" },
			{ status: 500 }
		);
	}
}
