export interface Email {
    id: string,
    subject: string,
    content: string,
    email: string,
    fromaddress: string,
}

export interface ComposeEmail{
    toaddress: string,
    fromaddress: string,
    subject: string,
    content: string
}

export interface Emails{
    subject:string,
    email:string,
    fromaddress: string,
    id: string,
    content: string,
  }