/**
 * CENTRALIZED NOTIFICATION SERVICE
 *
 * TODO: Integrate SMS providers (Twilio), Mobile push notifications (Firebase Cloud Messaging),
 * or internal App Websocket alerts.
 */

export interface INotificationPayload {
  userId: string;
  title: string;
  body: string;
  data?: Record<string, unknown>;
}

export const notificationService = {
  sendPush: async (_payload: INotificationPayload): Promise<void> => {
    // Send mobile push notification
  },
  sendSMS: async (_phoneNumber: string, _message: string): Promise<void> => {
    // Send text message
  },
};
export default notificationService;
