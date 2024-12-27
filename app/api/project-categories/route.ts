import { Container } from "@/src/infrastructure/container/container";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const SEARCH_QUERY = request?.nextUrl?.searchParams.get("search") || "";
		const PROJECT_CATEGORY_SERVICE = Container.getInstance().resolve(
			"ProjectCategoryService"
		);
		const CATEGORIES_BY_QUERY =
			await PROJECT_CATEGORY_SERVICE.findCategoriesByQuery(SEARCH_QUERY);
		if (!CATEGORIES_BY_QUERY || CATEGORIES_BY_QUERY.length === 0) {
			return NextResponse.json({ categories: [] }, { status: 200 });
		}

		return NextResponse.json(
			{ categories: CATEGORIES_BY_QUERY },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Project search error:", error);
		return NextResponse.json(
			{ error: "Failed to search project categories" },
			{ status: 500 }
		);
	}
}
