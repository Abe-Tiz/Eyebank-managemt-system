import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PhysicalExamView = () => {
  const [physicalExam, setPhysicalExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhysicalExam = async () => {
      try {
        const response = await axios.get('/api/physical-exam/:id'); // Replace '/api/physical-exam/:id' with the appropriate API endpoint
        setPhysicalExam(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to retrieve PhysicalExam');
        setLoading(false);
      }
    };

    fetchPhysicalExam();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Physical Exam Details</h1>
      {physicalExam && (
        <div>
          <p>Height: {physicalExam.height}</p>
          <p>Weight: {physicalExam.weight}</p>
          <p>Sex: {physicalExam.sex}</p>
          <p>Is Refrigerated: {physicalExam.isRefrigerated ? 'Yes' : 'No'}</p>
          <h2>Examined</h2>
          <ul>
            <li>Head: {physicalExam.examined.head ? 'Yes' : 'No'}</li>
            <li>Mouth: {physicalExam.examined.mouth ? 'Yes' : 'No'}</li>
            <li>Neck: {physicalExam.examined.neck ? 'Yes' : 'No'}</li>
            <li>Arms: {physicalExam.examined.arms ? 'Yes' : 'No'}</li>
            <li>Abdomen: {physicalExam.examined.abdomen ? 'Yes' : 'No'}</li>
            <li>Genitals: {physicalExam.examined.genitals ? 'Yes' : 'No'}</li>
            <li>Arteries: {physicalExam.examined.arteries ? 'Yes' : 'No'}</li>
            <li>Back: {physicalExam.examined.back ? 'Yes' : 'No'}</li>
          </ul>
          <h2>High-Risk Examined</h2>
          <ul>
            <li>Sexual: {physicalExam.highRiskexamined.sexual}</li>
            <li>Anal Intercourse: {physicalExam.highRiskexamined.analInterCourse}</li>
            <li>Non-Medical: {physicalExam.highRiskexamined.NonMedical}</li>
            <li>Oral Thrush: {physicalExam.highRiskexamined.oralThrush}</li>
            <li>Blue: {physicalExam.highRiskexamined.Blue}</li>
            <li>Enlarged Liver: {physicalExam.highRiskexamined.enlargedLiver}</li>
          </ul>
          <p>Cause of Death: {physicalExam.causeOfDeath}</p>
          <p>Date of Death: {physicalExam.dod}</p>
          <p>Story: {physicalExam.story}</p>
          <p>Time: {physicalExam.time}</p>
        </div>
      )}
    </div>
  );
};

export default PhysicalExamView;