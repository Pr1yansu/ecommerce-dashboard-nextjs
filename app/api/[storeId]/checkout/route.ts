import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prisma from "@/lib/prismadb";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: corsHeaders,
    }
  );
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const { productIds } = await req.json();
  if (!productIds || productIds.length === 0) {
    return new NextResponse("Product IDs are required", { status: 400 });
  }

  const products = await prisma?.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });

  const line_Items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  products?.forEach((product) => {
    line_Items.push({
      quantity: 1,
      price_data: {
        currency: "INR",
        product_data: {
          name: product.name,
        },
        unit_amount: Number(product.price) * 100,
      },
    });
  });

  const order = await prisma?.order.create({
    data: {
      storeId: params.storeId,
      isPaid: false,
      orderItems: {
        create: productIds.map((productId: string) => ({
          product: {
            connect: {
              id: productId,
            },
          },
        })),
      },
    },
  });

  const session = await stripe.checkout.sessions.create({
    line_items: line_Items,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${process.env.FRONTEND_URL}/cart?success=1`,
    cancel_url: `${process.env.FRONTEND_URL}/cart?cancel=1`,
    metadata: {
      orderId: order?.id,
    },
  });

  return NextResponse.json({ url: session.url }, { headers: corsHeaders });
}
