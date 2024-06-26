import { UIElementProps } from '../types';

export type UpiPaymentData = {
    paymentMethod: {
        type: TX_VARIANT;
        virtualPaymentAddress?: string;
        appId?: string;
    };
};

export enum UpiMode {
    Vpa = 'vpa',
    QrCode = 'qrCode',
    Intent = 'intent'
}

export enum TX_VARIANT {
    UpiCollect = 'upi_collect',
    UpiQr = 'upi_qr',
    UpiIntent = 'upi_intent'
}

export type App = { id: string; name: string; type?: TX_VARIANT };

export interface UPIElementProps extends UIElementProps {
    defaultMode?: UpiMode;
    // upi_intent
    apps?: Array<App>;
    /**
     * Redirect url for upi intent apps
     * @internal
     */
    url?: string;
    // Await
    paymentData?: string;
    // QR code
    qrCodeData?: string;
    brandLogo?: string;
}
