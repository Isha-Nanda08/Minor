import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Grow from '@mui/material/Grow';
import Company from '../Data/companies'; // Import your company data
import '../styles/companies.css'

const Companies = () => {
    const [breeds, setBreeds] = useState([]);  // State for API data
    const [error, setError] = useState(null);
        
    useEffect(() => {
        AOS.init({
            duration: 600,
            easing: 'ease-in-sine',
            delay: 100,
        });
        fetch("https://dogapi.dog/api/v2/breeds", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        .then(response => response.json()) 
        .then(data => {
            if (data.data) {
                setBreeds(data.data);  // Store fetched breeds
            }
        })
        .catch(error => setError(error.message)); 

    }, []);
    
    return (
        <div className="companies-container"> {/* Changed class name */}
            <Grow in>
                <Grid className="companies-grid" container alignItems="stretch" spacing={3}>
                    {Company.map((content) => (
                        <Grid 
                            item 
                            xs={12} 
                            sm={6} 
                            lg={3} 
                            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} 
                            key={content.id}
                        >
                            <div className="company-card" data-aos="flip-up">
                                <img src={content.img} alt={'image' + content.id} />
                                <p>{content.name}</p> {/* Optional: display company name */}
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </Grow>
        </div>
    );
}

export default Companies;
