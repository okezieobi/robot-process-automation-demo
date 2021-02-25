import validator from 'validator';

interface Candidate {
    firstname: string;
    lastname: string;
    phone: string;
    location: string;
    linkedIn: string;
    resume: string;
}

export default function handleRequest(candidate: Candidate) {
  const result: object[] = [];
  if (validator.isEmpty(`${candidate.firstname}`) || candidate.firstname === undefined) result.push({ param: 'firstname', msg: 'First name is required' });
  if (validator.isEmpty(`${candidate.lastname}`) || candidate.lastname === undefined) result.push({ param: 'lastname', msg: 'Last name is required' });
  if (validator.isEmpty(`${candidate.phone}`) || candidate.phone === undefined) result.push({ param: 'phone', msg: 'Phone number is required' });
  if (!validator.isMobilePhone(`${candidate.phone}`) && candidate.phone) result.push({ param: 'phone', value: candidate.phone, msg: 'Phone number format is incorrect' });
  if (validator.isEmpty(`${candidate.location}`) || candidate.location === undefined) result.push({ param: 'location', msg: 'Location is required' });
  if (validator.isEmpty(`${candidate.linkedIn}`) || candidate.linkedIn === undefined) result.push({ param: 'linkedIn', msg: 'Link to LinkedIn profile is required' });
  if (validator.isEmpty(`${candidate.resume}`) || candidate.resume === undefined) result.push({ param: 'resume', msg: 'Link to resume is required' });
  if (result.length > 0) return { messages: [...result], status: 400 };
  return { candidate };
}
