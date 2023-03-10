import {React, useState , useEffect} from "react"
import {Page, Card, DataTable, Badge, Button,
    TextField
} from '@shopify/polaris'
import { useAppQuery } from "../hooks"
import { ReactMultiEmail, isEmail } from 'react-multi-email';
import 'react-multi-email/dist/style.css';

export default function SettingsForm()
{
  const [emails, setEmails] = useState([])
  const [time, setTime] = useState()
  const [column, setColumn] = useState()
  const [value,setValue] = useState()
  const [isLoading,setIsLoading] = useState(true)
  
    const {
      data,
      refetch: refetchProductCount,
      isLoading: isLoadingCount,
      isRefetching: isRefetchingCount
    } = useAppQuery({
      url: "/api/settings",
      reactQueryOptions: {
        onSuccess: (data) => {
          const emailArray = data.emails.split(',')
          setEmails(emailArray)
          setTime(data.time)
          setIsLoading(false)
        },
      },
    })
    
    const {
      response,
    } = useAppQuery({
      url: `/api/updateEmail/${column}/${value}`,
      reactQueryOptions: {
        onSuccess: () => {
          
        },
      },
    })

    const handleTimeChange = (event) => {
      setTime(event.target.value)
      setColumn('email_time')
      setValue(event.target.value)
    };

    return(
        <>
          {(isLoading === false ) ?
            <div className="p-10">
              <h3>Input email address</h3>
              <ReactMultiEmail
                emails={emails}
                onChange={(_emails) => {
                  setColumn('setting_emails')
                  setEmails(_emails)
                  setValue(_emails)
                }}
                getLabel={(email, index, removeEmail) => {
                  return (
                    <div data-tag key={index}>
                      <div data-tag-item>{email}</div>
                      <span data-tag-handle onClick={() => removeEmail(index)}>
                        ×
                      </span>
                    </div>
                  );
                }}
                />

                <h3>Input Time</h3>
                <input
                  type="time"
                  id="time-input"
                  name="time"
                  className="form-control"
                  value={time}
                  onChange={handleTimeChange}
                />
            </div>
            :
            <center><img className='loading' src='../images/loader.gif' /></center>
          }
        </>
    )
}