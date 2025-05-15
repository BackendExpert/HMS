import axios from 'axios';
import React, { useEffect, useState } from 'react'

const CreateREallocation = () => {
    const [hosteldatastd, sethosteldatastd] = useState(null);
    useEffect(() => {
        axios
            .get(import.meta.env.VITE_APP_API + '/student/getcurrentstdhostlroom', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                sethosteldatastd(res.data.Result);
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
            });
    }, []);

    return (
        <div>CreateREallocation</div>
    )
}

export default CreateREallocation