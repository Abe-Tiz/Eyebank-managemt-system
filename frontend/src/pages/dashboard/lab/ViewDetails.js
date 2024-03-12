import React, { useEffect, useState } from 'react';

const ViewDetails = () => {
  const [physicalExam, setPhysicalExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhysicalExam = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/getOne/id'); // Replace 123 with the actual id of the physical exam
        const data = await response.json();
        setPhysicalExam(data);
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
    <div className='p-10 bg-gray-100 rounded shadow mt-10 bg-white w-1/2 mx-auto text-center'>
      <h1>Physical Exam Details</h1>
      {physicalExam && (
        <div>
          <p>Height: {physicalExam.height}</p>
          <p>Weight: {physicalExam.weight}</p>
          <p>Sex: {physicalExam.sex}</p>
          <p>Is Refrigerated: {physicalExam.isRefrigerated ? 'Yes' : 'No'}</p>
          <h2>Examined</h2>
          <ul>
            <li>Head: {physicalExam.examined?.head ? 'Yes' : 'No'}</li>
            <li>Mouth: {physicalExam.examined?.mouth ? 'Yes' : 'No'}</li>
            <li>Neck: {physicalExam.examined?.neck ? 'Yes' : 'No'}</li>
            <li>Arms: {physicalExam.examined?.arms ? 'Yes' : 'No'}</li>
            <li>Abdomen: {physicalExam.examined?.abdomen ? 'Yes' : 'No'}</li>
            <li>Genitals: {physicalExam.examined?.genitals ? 'Yes' : 'No'}</li>
            <li>Arteries: {physicalExam.examined?.arteries ? 'Yes' : 'No'}</li>
            <li>Back: {physicalExam.examined?.back ? 'Yes' : 'No'}</li>
          </ul>
          <h2>High-Risk Examined</h2>
          <ul>
            <li>Sexual: {physicalExam.highRiskexamined?.sexual}</li>
            <li>Anal Intercourse: {physicalExam.highRiskexamined?.analIntercourse}</li>
            <li>Non-Medical: {physicalExam.highRiskexamined?.nonMedical}</li>
            <li>Oral Thrush: {physicalExam.highRiskexamined?.oralThrush}</li>
            <li>Blue: {physicalExam.highRiskexamined?.blue}</li>
            <li>Enlarged Liver: {physicalExam.highRiskexamined?.enlargedLiver}</li>
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

export default ViewDetails;