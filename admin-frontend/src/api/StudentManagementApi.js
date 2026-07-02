//src/api/StudentManagementApi.js
const API_BASE_URL = '/api/student-management';
const DASHBOARD_API_URL = '/api/dashboard';

const handleApiResponse = async (response) => {
    if (!response.ok) {
        let errorData;
        try {
            errorData = await response.json();
        } catch (e) {
            errorData = { message: response.statusText || `HTTP error! Status: ${response.status}` };
        }
        throw new Error(errorData.message || `Server error: ${response.status}`);
    }

    if (response.status === 204) {
        return { success: true, status: response.status, message: 'Operation successful, no content returned.' };
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        return response.json();
    }
    return { success: true, status: response.status, data: await response.text() };
};

export const fetchStudentInformation = (filters = {}, page = 1, limit = 5) => {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
        if (value !== '' && value !== null && value !== undefined) {
            queryParams.append(key, value);
        }
    });
    queryParams.append('page', page.toString());
    queryParams.append('limit', limit.toString());

    return fetch(`${API_BASE_URL}/students?${queryParams.toString()}`).then(handleApiResponse);
};

export const fetchStudentSummary = (filters = {}) => {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
        if (value !== '' && value !== null && value !== undefined) {
            queryParams.append(key, value);
        }
    });
    const queryString = queryParams.toString();
    return fetch(`${API_BASE_URL}/summary${queryString ? `?${queryString}` : ''}`).then(handleApiResponse);
};


export const editStudent = (rollNo, studentData) =>
    fetch(`${API_BASE_URL}/students/${rollNo}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData),
    }).then(handleApiResponse);

export const deleteStudent = (rollNo) =>
    fetch(`${API_BASE_URL}/students/${rollNo}`, {
        method: 'DELETE',
    }).then(handleApiResponse);

export const fetchEnrollmentTrends = () =>
    fetch(`${DASHBOARD_API_URL}/analytics/enrollment-trends`).then(handleApiResponse);

export const fetchPlacementStatus = () =>
    fetch(`${DASHBOARD_API_URL}/analytics/placement-status`).then(handleApiResponse);

export const fetchDistinctFilterOptions = () => {
    return fetch(`${API_BASE_URL}/filters`).then(handleApiResponse);
};