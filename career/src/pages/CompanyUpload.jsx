import React, { useState } from 'react';
import { 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  FormControlLabel, 
  Checkbox, 
  Grid, 
  Chip, 
  Box, 
  Divider, 
  Snackbar,
  Alert,
  FormHelperText
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import BusinessIcon from '@mui/icons-material/Business';
import { motion } from 'framer-motion';
import '../styles/companyupload.css';

const CompanyUploadForm = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    cgpaCriteria: '',
    branches: [],
    activeBacklogs: 'no',
    role: '',
    hiringType: '',
    jobDescription: '',
    logoFile: null,
    additionalInfo: ''
  });
  
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [preview, setPreview] = useState(false);
  
  // Available branches
  const branchOptions = [
    'Computer Science', 
    'Information Technology', 
    'Electronics & Communication', 
    'Electrical Engineering',
    'Mechanical Engineering', 
    'Civil Engineering', 
    'Chemical Engineering',
    'Biotechnology'
  ];
  
  // Hiring types
  const hiringTypes = [
    '2 Month Internship',
    '6 Month Internship',
    'Full Time Employment',
    'Full Time + Internship'
  ];
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  const handleBranchChange = (e) => {
    setFormData({
      ...formData,
      branches: e.target.value
    });
    
    if (errors.branches) {
      setErrors({
        ...errors,
        branches: null
      });
    }
  };
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        logoFile: e.target.files[0]
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.cgpaCriteria.trim()) newErrors.cgpaCriteria = 'CGPA criteria is required';
    if (!formData.branches || formData.branches.length === 0) newErrors.branches = 'Select at least one branch';
    if (!formData.role.trim()) newErrors.role = 'Role is required';
    if (!formData.hiringType) newErrors.hiringType = 'Hiring type is required';
    
    // Validate CGPA is a number between 0 and 10
    if (formData.cgpaCriteria && (isNaN(formData.cgpaCriteria) || 
        parseFloat(formData.cgpaCriteria) < 0 || 
        parseFloat(formData.cgpaCriteria) > 10)) {
      newErrors.cgpaCriteria = 'CGPA must be a number between 0 and 10';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, you would send this data to your backend
      console.log('Form submitted:', formData);
      
      // Show success message
      setSnackbar({
        open: true,
        message: 'Company details submitted successfully!',
        severity: 'success'
      });
      
      // Reset form
      setFormData({
        companyName: '',
        cgpaCriteria: '',
        branches: [],
        activeBacklogs: 'no',
        role: '',
        hiringType: '',
        jobDescription: '',
        logoFile: null,
        additionalInfo: ''
      });
      
      setPreview(false);
    } else {
      setSnackbar({
        open: true,
        message: 'Please fix the errors in the form',
        severity: 'error'
      });
    }
  };
  
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  
  const togglePreview = () => {
    setPreview(!preview);
  };

  return (
    <motion.div
      className="company-upload-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper elevation={3} className="upload-form-paper">
        <div className="form-header">
          <BusinessIcon className="form-icon" />
          <Typography variant="h5" component="h2">
            Upload Company Details
          </Typography>
        </div>
        
        <Typography variant="body1" className="form-subheader">
          Please provide information about the company for placement bulletin
        </Typography>
        
        <Divider className="form-divider" />
        
        {!preview ? (
          <form onSubmit={handleSubmit} className="company-upload-form">
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Company Name"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  variant="outlined"
                  error={!!errors.companyName}
                  helperText={errors.companyName}
                  required
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="CGPA Criteria"
                  name="cgpaCriteria"
                  value={formData.cgpaCriteria}
                  onChange={handleInputChange}
                  variant="outlined"
                  type="number"
                  inputProps={{ step: "0.1", min: "0", max: "10" }}
                  error={!!errors.cgpaCriteria}
                  helperText={errors.cgpaCriteria || "Minimum CGPA required"}
                  required
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControl fullWidth error={!!errors.branches} required>
                  <InputLabel id="branches-label">Eligible Branches</InputLabel>
                  <Select
                    labelId="branches-label"
                    multiple
                    name="branches"
                    value={formData.branches}
                    onChange={handleBranchChange}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                  >
                    {branchOptions.map((branch) => (
                      <MenuItem key={branch} value={branch}>
                        {branch}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.branches && <FormHelperText>{errors.branches}</FormHelperText>}
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel id="backlogs-label">Active Backlogs Allowed</InputLabel>
                  <Select
                    labelId="backlogs-label"
                    name="activeBacklogs"
                    value={formData.activeBacklogs}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="yes">Yes</MenuItem>
                    <MenuItem value="no">No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  variant="outlined"
                  placeholder="e.g. Software Engineer, Data Analyst"
                  error={!!errors.role}
                  helperText={errors.role}
                  required
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControl fullWidth error={!!errors.hiringType} required>
                  <InputLabel id="hiring-type-label">Hiring Type</InputLabel>
                  <Select
                    labelId="hiring-type-label"
                    name="hiringType"
                    value={formData.hiringType}
                    onChange={handleInputChange}
                  >
                    {hiringTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.hiringType && <FormHelperText>{errors.hiringType}</FormHelperText>}
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Job Description"
                  name="jobDescription"
                  value={formData.jobDescription}
                  onChange={handleInputChange}
                  variant="outlined"
                  multiline
                  rows={4}
                  placeholder="Enter job description, responsibilities, and requirements"
                />
              </Grid>
              
              <Grid item xs={12}>
                {/* <div className="file-upload-container">
                  <input
                    type="file"
                    accept="image/*"
                    id="company-logo-upload"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                  {/* <label htmlFor="company-logo-upload">
                    <Button
                      variant="outlined"
                      component="span"
                      startIcon={<CloudUploadIcon />}
                      className="upload-button"
                    >
                      Upload Company Logo
                    </Button>
                  </label> */}
                  {/* {formData.logoFile && (
                    <Typography variant="body2" className="file-name">
                      {formData.logoFile.name}
                    </Typography>
                  )}
                </div> */}
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Additional Information"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  variant="outlined"
                  multiline
                  rows={3}
                  placeholder="Any additional information about the company or recruitment process"
                />
              </Grid>
            </Grid>
            
            <div className="form-actions">
              <Button 
                variant="outlined" 
                color="primary" 
                onClick={togglePreview}
              >
                Preview
              </Button>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                className="submit-button"
              >
                Submit Company Details
              </Button>
            </div>
          </form>
        ) : (
          <div className="preview-container">
            <Typography variant="h6" className="preview-header">
              Preview Company Details
            </Typography>
            
            <div className="preview-content">
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2">Company Name:</Typography>
                  <Typography variant="body1" className="preview-value">{formData.companyName || 'Not provided'}</Typography>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2">CGPA Criteria:</Typography>
                  <Typography variant="body1" className="preview-value">{formData.cgpaCriteria || 'Not provided'}</Typography>
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Eligible Branches:</Typography>
                  <div className="preview-chips">
                    {formData.branches.length > 0 ? 
                      formData.branches.map(branch => (
                        <Chip key={branch} label={branch} className="preview-chip" />
                      )) : 
                      <Typography variant="body2" className="no-data">No branches selected</Typography>
                    }
                  </div>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2">Active Backlogs Allowed:</Typography>
                  <Typography variant="body1" className="preview-value">
                    {formData.activeBacklogs === 'yes' ? 'Yes' : 'No'}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2">Role:</Typography>
                  <Typography variant="body1" className="preview-value">{formData.role || 'Not provided'}</Typography>
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Hiring Type:</Typography>
                  <Typography variant="body1" className="preview-value">{formData.hiringType || 'Not provided'}</Typography>
                </Grid>
                
                {formData.jobDescription && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">Job Description:</Typography>
                    <Typography variant="body2" className="preview-text-block">
                      {formData.jobDescription}
                    </Typography>
                  </Grid>
                )}
                
                {formData.additionalInfo && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">Additional Information:</Typography>
                    <Typography variant="body2" className="preview-text-block">
                      {formData.additionalInfo}
                    </Typography>
                  </Grid>
                )}
                
                {/* {formData.logoFile && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">Company Logo:</Typography>
                    <Typography variant="body2" className="file-name">
                      {formData.logoFile.name} (File selected)
                    </Typography>
                  </Grid>
                )} */}
              </Grid>
            </div>
            
            <div className="form-actions">
              <Button 
                variant="outlined" 
                color="primary" 
                onClick={togglePreview}
              >
                Edit Form
              </Button>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleSubmit}
                className="submit-button"
              >
                Confirm & Submit
              </Button>
            </div>
          </div>
        )}
      </Paper>
      
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity} 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </motion.div>
  );
};

export default CompanyUploadForm;