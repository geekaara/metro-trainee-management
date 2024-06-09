import React, { useState } from 'react';
import {
    Container,
    Box,
    Typography,
    Button,
    Stepper, Step, StepLabel
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import AddQualifications from './AddQualifications';
import AddInstructorAvailability from './AddInstructorAvailability';
import BasicDetails from './BasicDetails';
import { addInstructor } from '../services/InstructorService';

const steps = [
    'Basic Details',
    'Qualifications',
    'Availability',
];

function AddInstructor() {
    const navigate = useNavigate();
    const [instructorDetails, setInstructorDetails] = useState({
        title: '',
        firstName: '',
        lastName: '',
        formalName: '',
        gender: '',
        contactNo: '',
        employeeID: '',
        email: '',
        qualifications: [''],
        startDate: '',
        endDate: '',
        availability: ['']
    });

    const [activeStep, setActiveStep] = useState(0);
    const [error, setError] = useState("");

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const saveBasicDetails = (basicDetails) => {
        setInstructorDetails({
            ...instructorDetails,
            ...basicDetails
        });
    };

    const saveQualificationDetails = (qualificationDetails) => {
        setInstructorDetails({
            ...instructorDetails,
            ...qualificationDetails
        });
    };

    const saveAvailabilityDetails = (availability, startEndDates) => {
        if (availability.availability) {
            const selectedDays = Object.keys(availability.availability).filter(day => availability.availability[day]);
            setInstructorDetails({
                ...instructorDetails,
                availability: selectedDays
            });
        } else {
            setInstructorDetails({
                ...instructorDetails,
                startDate: startEndDates.startDate,
                endDate: startEndDates.endDate
            });
        }
    };

    const handleFinish = async () => {
        try {
            await addInstructor(instructorDetails);
            toast.success("Instructor added successfully!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            // Redirect to desired route after successful addition
            setTimeout(() => navigate("/view-instructors"), 3000);
        } catch (error) {
            console.error("Error adding instructor:", error);
            toast.error("Error adding instructor. Please try again.");
        }
    };

    return (
        <Container maxWidth="md">
            <ToastContainer />
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleReset}>Reset</Button>
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Box sx={{ mt: 3 }}>
                            {(() => {
                                switch (activeStep) {
                                    case 0:
                                        return <BasicDetails fetchedInstructorDetails={instructorDetails} saveBasicDetails={saveBasicDetails} />;
                                    case 1:
                                        return <AddQualifications fetchedInstructorDetails={instructorDetails} saveQualificationDetails={saveQualificationDetails} />;
                                    case 2:
                                        return <AddInstructorAvailability fetchedInstructorDetails={instructorDetails} saveAvailabilityDetails={saveAvailabilityDetails} />;
                                    default:
                                        return (
                                            <Typography variant="h5">
                                                All steps completed - you're finished
                                            </Typography>
                                        );
                                }
                            })()}
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                variant="contained" color="primary"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button variant="contained" color="primary"
                                onClick={activeStep === steps.length - 1 ? handleFinish : handleNext}
                            >
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </Box>
                    </React.Fragment>
                )}
            </Box>
        </Container>
    );
}

export default AddInstructor;
