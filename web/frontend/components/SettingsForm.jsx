import {React, useState , useCallback} from "react"
import {Page, Card, DataTable, Badge, Button,
    TextField
} from '@shopify/polaris'
import { useAppQuery } from "../hooks"
import { ReactMultiEmail, isEmail } from 'react-multi-email';
import 'react-multi-email/dist/style.css';

export default function SettingsForm()
{
  const [emails, setEmails] = useState([]);
  const {
      data
    } = useAppQuery({
      url: "/api/settings",
      reactQueryOptions: {
        onSuccess: () => {
          console.log('API',data)
          // setEmails(data.shop.setting_emails)
        },
      },
    });

    return(
        <>
        {console.log('return',data)}
        <p>{data && data.shop.setting_emails}</p>
        <ReactMultiEmail 
          emails={data && data.shop.setting_emails}
        />
        
        {/* <div className="p-10">
          <h3>Input email address</h3>
          <ReactMultiEmail
            emails={emails}
            onChange={(_emails) => {
              setEmails(_emails)
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
            </div> */}


        {/* <div className='container'>
          <div className='row'>
            <div className='form-group'>
              <div className='col-sm-4'>
                <h4 for='example_emailBS'>Input email addresses</h4>
                <input type='text' 
                    id='example_emailBS'
                    className='form-control'
                />
              </div>
              <div className='col-sm-offset-2 col-sm-4'>
                <h4>Current email addresses</h4>
                <pre id='current_emailsBS'>{emails}</pre>
              </div>
            </div>
          </div>
        </div>
        <div className='container'>
          <div className='row'>
            <div className='form-group'>
              <div className='col-sm-4'>
                <h4 for='example_emailBS'>Enter Email Time</h4>
                <input type='time' id="time_data" name='time' className='form-control' />
              </div>
              <div className='col-sm-offset-2 col-sm-4'>
                <h4>Current email Time</h4>
                <pre id='current_email_time'></pre>
              </div>
            </div>
          </div>
        </div> */}
        </>
    )
}