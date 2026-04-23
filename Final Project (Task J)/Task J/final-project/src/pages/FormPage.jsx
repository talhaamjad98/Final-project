import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import FormResponse from '../components/FormResponse';

const schema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  reservationDate: z.string().refine((val) => !isNaN(Date.parse(val)), "Please select a valid date"),
  guests: z.number().min(1, "At least 1 guest required").max(20, "Maximum 20 guests"),
  comments: z.string().optional()
});

const FormPage = () => {
  const [serverResponse, setServerResponse] = useState(null);
  const [sentData, setSentData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      guests: 1
    }
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSentData(data);
    try {
      const response = await fetch('https://httpbin.org/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      setServerResponse(result);
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again.');
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
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              placeholder="John Doe"
              {...register('fullName')}
              className={errors.fullName ? 'error' : ''}
            />
            {errors.fullName && <span className="error-message">{errors.fullName.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="TALHA@example.com"
              {...register('email')}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email.message}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="reservationDate">Date</label>
              <input
                id="reservationDate"
                type="date"
                {...register('reservationDate')}
                className={errors.reservationDate ? 'error' : ''}
              />
              {errors.reservationDate && <span className="error-message">{errors.reservationDate.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="guests">Guests</label>
              <input
                id="guests"
                type="number"
                {...register('guests', { valueAsNumber: true })}
                className={errors.guests ? 'error' : ''}
              />
              {errors.guests && <span className="error-message">{errors.guests.message}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="comments">Special Requests (Optional)</label>
            <textarea
              id="comments"
              placeholder="Any allergies or special occasions?"
              {...register('comments')}
            ></textarea>
          </div>

          <button type="submit" className="btn submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Confirm Reservation'}
          </button>
        </form>

        <FormResponse response={serverResponse} sentData={sentData} />
      </div>
    </div>
  );
};

export default FormPage;
