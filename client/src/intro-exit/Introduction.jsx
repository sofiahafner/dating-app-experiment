import React, { useState } from 'react';
import { Button } from '../components/Button';

export function Introduction({ next }) {
  const [isAgeConfirmed, setIsAgeConfirmed] = useState(false);

  const handleAgeConfirmationChange = (event) => {
    setIsAgeConfirmed(event.target.checked);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-10">
        <div className="mb-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            General Information
          </h3>
          <p className="text-sm text-gray-500">
            The aim of this research is to better understand how users interact with recommendation systems in the context of dating apps.
            <br /><br />
            We appreciate your interest in participating in this online task and survey. Please read through this information before agreeing to participate (if you wish to) by ticking the ‘yes’ box below.
            <br /><br />
            You may ask any questions before deciding to take part by contacting the researcher (details below).
            <br /><br />
            The study is being conducted by Franziska Hafner, who is attached to the Oxford Internet Institute at the University of Oxford. This research is being completed under the supervision of Dr Luc Rocher.
            <br /><br />
            For this research, you will be asked to interact with a simulated dating app playing a character you will be assigned. You will be asked questions about your experience during and after the experiment. This should take about 15 minutes. No background knowledge is required. We will not record your name or any other data that would allow us or other researchers to identify you. Your answers as well as data on how you interact with the simulated dating app will be used to better understand how dating app recommendation systems learn, and how they are understood by users.
            <br /><br />
          </p>

          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Do I have to take part?
          </h3>
          <p className="text-sm text-gray-500">
            No. Please note that participation is voluntary. If you do decide to take part, you may withdraw at any point for any reason during the experiment before submitting your answers by pressing the ‘Exit’ button/closing the browser. As we do not collect information that allows us to identify you, you will not be able to withdraw information after the experiment is over. We are also only able to reimburse participants who complete all research activities. All questions are optional.
            <br /><br />
          </p>

          <h3 className="text-lg leading-6 font-medium text-gray-900">
            How will my data be used?
          </h3>
          <p className="text-sm text-gray-500">
            We will not collect any data that could directly identify you.
            <br /><br />
            Your IP address will not be stored. We will take all reasonable measures to ensure that data remain confidential.
            <br /><br />
            The responses you provide will be stored in a password-protected electronic file on University of Oxford secure servers and may be used in academic publications or conference presentations. Research data will be stored for a minimum of 3 years after publication or public release of the work of the research.
            <br /><br />
            The data that we collect from you may be transferred to, stored and/or processed at a destination outside the UK and the European Economic Area. By submitting your personal data, you agree to this transfer, storing or processing.
            <br /><br />
          </p>

          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Who will have access to my data?
          </h3>
          <p className="text-sm text-gray-500">
            The University of Oxford is the data controller with respect to your personal data and, as such, will determine how your personal data is used in the research. Research is a task that we perform in the public interest. Further information about your rights with respect to your personal data is available from https://compliance.admin.ox.ac.uk/individual-rights.
            <br /><br />
            We would like to use the data in future studies, and to share data with other researchers (e.g., in online databases). Data will have identifying information removed before it is shared with other researchers or results are made public.
            <br /><br />
            The results will be written up for an MSc degree.
            <br /><br />
          </p>

          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Who has reviewed this research?
          </h3>
          <p className="text-sm text-gray-500">
            This research has been reviewed by, and received ethics clearance through, a subcommittee of the University of Oxford Central University Research Ethics Committee OII_C1A_24_065.
            <br /><br />
          </p>

          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Who do I contact if I have a concern or I wish to complain?
          </h3>
          <p className="text-sm text-gray-500">
            If you have a concern about any aspect of this research, please contact Franziska Hafner at Franziska.Hafner@oii.ox.ac.uk or Dr Luc Rocher at Luc.Rocher@oii.ox.ac.uk, and we will do our best to answer your query. We will acknowledge your concern within 10 working days and give you an indication of how it will be dealt with. If you remain unhappy or wish to make a formal complaint, please contact the University of Oxford Research Governance, Ethics & Assurance (RGEA) team at rgea.complaints@admin.ox.ac.uk or on 01865 616480.
            <br /><br />
            Please note that you may only participate in this survey if you are 18 years of age or over.
            <br /><br />
            If you have read the information above and agree to participate with the understanding that the data (including any personal data) you submit will be processed accordingly, please tick the box below to start.
            <br /><br />
          </p>

          <div className="mt-2 mb-6">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={isAgeConfirmed}
                onChange={handleAgeConfirmationChange}
              />
              <span className="ml-2">I certify that I am 18 years of age or over</span>
            </label>
          </div>
          <button
            onClick={next}
            autoFocus
            disabled={!isAgeConfirmed}
            className={`px-4 py-2 rounded text-white font-bold ${isAgeConfirmed ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-500'}`}
          >
            I agree and wish to participate
          </button>
        </div>
      </div>
    </div>
  );
}
