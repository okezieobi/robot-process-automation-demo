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
  if (!validator.isEmpty(`${candidate.firstname}`)) result.push({ param: 'firstname', msg: 'First name is required' });
  if (!validator.isEmpty(`${candidate.lastname}`)) result.push({ param: 'lastname', msg: 'Last name is required' });
  if (!validator.isEmpty(`${candidate.phone}`)) result.push({ param: 'phone', msg: 'Phone number is required' });
  if (!validator.isMobilePhone(`${candidate.phone}`)) result.push({ param: 'phone', value: candidate.phone, msg: 'Phone number format is incorrect' });
  if (!validator.isEmpty(`${candidate.location}`)) result.push({ param: 'location', msg: 'Location is required' });
  if (!validator.isEmpty(`${candidate.linkedIn}`)) result.push({ param: 'linkedIn', msg: 'Linked in profile link is required' });
  if (!validator.isEmpty(`${candidate.resume}`)) result.push({ param: 'resume', msg: 'Resume is required' });
  if (result.length > 0) return { messages: [...result], status: 400 };
  return { candidate };
}
