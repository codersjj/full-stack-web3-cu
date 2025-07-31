import { v4 as uuidv4 } from "uuid"

export async function POST(request: Request) {
  try {
    // Parse the incoming request body
    const { address } = await request.json()

    if (!address) {
      return Response.json({ error: "Address is required", success: false })
    }

    const circleApiKey = process.env.CIRCLE_API_KEY
    if (!circleApiKey) {
      return Response.json({ error: "Circle API key is not configured", success: false })
    }

    const complianceEnabled = process.env.ENABLE_COMPLIANCE_CHECK === "true"
    if (!complianceEnabled) {
      console.log("Compliance check is disabled")
      return Response.json({
        success: true,
        isApproved: true,
        data: {
          result: "APPROVED",
          message: "Compliance check is disabled",
        },
      })
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${circleApiKey}`,
      },
      body: JSON.stringify({
        idempotencyKey: uuidv4(),
        address,
        chain: "ETH-SEPOLIA", // Hard-coded as requested
      }),
    }

    const response = await fetch(
      "https://api.circle.com/v1/w3s/compliance/screening/addresses",
      options
    )
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data?.message || "Failed to check compliance")
    }

    const isApproved = data?.data?.result === "APPROVED"

    return Response.json({
      success: true,
      isApproved,
      data: data?.data,
    })
  } catch (error) {
    console.error("Compliance check error:", error)
    return Response.json({
      error: error instanceof Error ? error.message : "An unknown error occurred",
      status: 500,
      success: false,
    })
  }
}
