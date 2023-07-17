import React from 'react'
import { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'

const notion = new Client({
  auth: 'secret_cNyiFARWux7ezYn5fKrnCJeMVv3Xa9H9MntGjXCqmmM',
})

const databaseId = '1dad9796ee7943c6bef30ce98750e6e1'

async function getItems() {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [{ property: 'Price', direction: 'ascending' }],
    })
    console.log(response)
    return response
  } catch (error) {
    console.log(JSON.stringify(error))
  }
}

type Data = {
  items?: any
  message: string
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    const response = await getItems()
    res.status(200).json({ items: response?.results, message: 'Success' })
  } catch (error) {
    res.status(400).json({ message: `Failed` })
  }
}
