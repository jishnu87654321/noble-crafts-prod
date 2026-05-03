import mongoose, { Schema, model, models } from "mongoose";

export interface IRegistration {
  name: string;
  email: string;
  phone: string;
  websiteType: string;
  otherWebsiteType?: string;
  createdAt: Date;
}

const RegistrationSchema = new Schema<IRegistration>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    websiteType: { type: String, required: true },
    otherWebsiteType: { type: String },
  },
  { timestamps: true }
);

const Registration = models.Registration || model("Registration", RegistrationSchema);

export default Registration;
