/**
 * Models the service respone, all responses will include the
 * data in this interface.
 */
export interface ServiceResponse {
    message: string;
    data: any;
    success: boolean;
}
