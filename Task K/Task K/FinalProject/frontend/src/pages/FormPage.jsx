import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// --- Validation Schema ---
const schema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name is too long")
    .regex(/^[a-zA-Z\s]+$/, "Only letters and spaces are allowed"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),

  reservationDate: z
    .string()
    .min(1, "Please select a date")
    .refine((val) => {
      const selectedDate = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time for accurate date comparison
      return selectedDate >= today;
    }, "Reservation date cannot be in the past"),

  guests: z
    .coerce.number({ invalid_type_error: "Please enter a number" })
    .min(1, "At least 1 guest required")
    .max(20, "For parties over 20, please contact us by phone"),

  comments: z
    .string()
    .max(300, "Requests must be under 300 characters")
    .optional(),
});

const FormPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Get today's date in YYYY-MM-DD format for the 'min' attribute
  const todayDate = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      guests: 1,
      fullName: "",
      email: "",
      reservationDate: "",
      comments: "",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSuccessMsg("");

    try {
      const response = await fetch("http://localhost:5000/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Server error");

      reset();
      setSuccessMsg("Reservation submitted successfully ✅");
    } catch (error) {
      console.error("Error submitting form:", error);
      setSuccessMsg("Failed to submit reservation. Please try again ❌");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <h2 className="section-title">Table Reservation</h2>
        <p className="form-subtitle">Book your experience at Aura Coffee</p>

        <form onSubmit={handleSubmit(onSubmit)} className="reservation-form">
          {/* Full Name */}
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              {...register("fullName")}
              className={errors.fullName ? "error" : ""}
            />
            {errors.fullName && <p className="error-message">{errors.fullName.message}</p>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="john@example.com"
              {...register("email")}
              className={errors.email ? "error" : ""}
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>

          {/* Date + Guests Row */}
          <div className="form-row">
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                min={todayDate} // Prevents selecting past dates in the browser picker
                {...register("reservationDate")}
                className={errors.reservationDate ? "error" : ""}
              />
              {errors.reservationDate && (
                <p className="error-message">{errors.reservationDate.message}</p>
              )}
            </div>

            <div className="form-group">
              <label>Guests</label>
              <input
                type="number"
                {...register("guests")}
                className={errors.guests ? "error" : ""}
              />
              {errors.guests && <p className="error-message">{errors.guests.message}</p>}
            </div>
          </div>

          {/* Comments */}
          <div className="form-group">
            <label>Special Requests (Optional)</label>
            <textarea
              placeholder="Any allergies or special occasions?"
              {...register("comments")}
              className={errors.comments ? "error" : ""}
            />
            {errors.comments && <p className="error-message">{errors.comments.message}</p>}
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={isSubmitting} className="submit-btn">
            {isSubmitting ? "Submitting..." : "Confirm Reservation"}
          </button>
        </form>

        {/* Status Message */}
        {successMsg && (
          <p
            style={{
              marginTop: "15px",
              color: successMsg.includes("✅") ? "lightgreen" : "#ff6b6b",
              textAlign: "center",
              fontWeight: "bold"
            }}
          >
            {successMsg}
          </p>
        )}
      </div>
    </div>
  );
};

export default FormPage;