// lib/api-helpers.ts
export const fetchBLSData = async (seriesId: string, startYear?: string, endYear?: string) => {
  const payload = startYear && endYear 
    ? { seriesid: [seriesId], startyear: startYear, endyear: endYear }
    : { seriesid: [seriesId] };

  const response = await fetch('https://api.bls.gov/publicAPI/v1/timeseries/data/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch BLS data');
  }

  return response.json();
};

export const fetchONetData = async (onetCode: string) => {
  // O*NET doesn't have a direct API, so we'll use their public data
  const response = await fetch(`https://services.onetcenter.org/ws/online/occupations/${onetCode}/summary`, {
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch O*NET data');
  }

  return response.json();
};

export const fetchAdzunaJobs = async (query: string, country: string = 'us') => {
  const response = await fetch(
    `https://api.adzuna.com/v1/api/jobs/${country}/search/1?app_id=d41d8cd9&app_key=0b0fba74d205985e7a3443c83dd91dd7&what=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch Adzuna jobs data');
  }

  return response.json();
};