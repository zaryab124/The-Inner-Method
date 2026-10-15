import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { verifyDownloadToken, incrementOrderDownload } from '@/lib/orders';

export async function GET(
  req: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const orderId = params.orderId;
    const url = new URL(req.url);
    const token = url.searchParams.get('token');

    if (!token) {
      return new NextResponse(
        JSON.stringify({
          error: 'Download token is missing. Please use the authorized link provided on your receipt.',
        }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const verification = await verifyDownloadToken(orderId, token);
    if (!verification.valid || !verification.order) {
      return new NextResponse(
        JSON.stringify({
          error: verification.error || 'Invalid or expired download authorization.',
        }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const order = verification.order;
    const item = order.items[0];
    const requestedFileName = item?.pdfFileName || 'The_Huberman_Blueprint_EBook.pdf';

    // Locate PDF asset in public or root directory
    let filePath = path.join(process.cwd(), 'public', requestedFileName);
    if (!fs.existsSync(filePath)) {
      // Fallback check in parent or alternative folder
      filePath = path.join(process.cwd(), requestedFileName);
    }

    if (!fs.existsSync(filePath)) {
      // Fallback check default Huberman PDF
      const fallbackPath = path.join(process.cwd(), 'public', 'The_Huberman_Blueprint_EBook.pdf');
      if (fs.existsSync(fallbackPath)) {
        filePath = fallbackPath;
      } else {
        return new NextResponse(
          JSON.stringify({
            error: 'Publication file is being prepared. Please contact support@theinnermethod.com.',
          }),
          { status: 404, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // Increment download counter
    await incrementOrderDownload(order.id);

    const fileBuffer = fs.readFileSync(filePath);
    const fileName = path.basename(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Content-Length': fileBuffer.length.toString(),
        'Cache-Control': 'private, no-cache, no-store, must-revalidate',
        'X-Robots-Tag': 'noindex, nofollow',
        'X-Fulfillment-Security': 'Paysafe-Authorized-Token',
      },
    });
  } catch (error: unknown) {
    console.error('Download route error:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Server error while generating your download stream.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
