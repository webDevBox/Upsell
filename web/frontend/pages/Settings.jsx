import {React, useState , useCallback} from "react"
import {Page, Card, DataTable, Badge, Button

} from '@shopify/polaris'
import SettingsForm from '../components/SettingsForm'

export default function Settings() {
  return (
    <>
    <Page>
      <Card>
        <SettingsForm />
      </Card>
    </Page>
    </>
  );
}