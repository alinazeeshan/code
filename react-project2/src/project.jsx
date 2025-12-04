import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import {
    getFirestore,
    doc,
    setDoc,
    onSnapshot,
} from 'firebase/firestore';

// --- Global Context Variables (Canvas / embedding-friendly) ---
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = typeof __firebase_config !== 'undefined' && __firebase_config ? JSON.parse(__firebase_config) : {};
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// --- 1. MASTER DATA (Careers, Skills, Interests, Resources) ---
const ALL_SKILLS = [
    'React', 'JavaScript', 'HTML/CSS', 'Tailwind CSS', 'UI/UX Design', 
    'Node.js', 'Python', 'SQL', 'Data Science', 'Machine Learning', 
    'Cloud Computing', 'API Integration', 'Testing', 'Version Control (Git)'
];

const ALL_INTERESTS = [
    'Coding', 'Design', 'Problem Solving', 'Data Analysis', 
    'Writing', 'Finance', 'Leadership', 'Research'
];

const MASTER_CAREERS = [
    {
        id: 1,
        title: "Frontend Developer",
        description: "Focuses on the client-side of web development, building interactive user interfaces and ensuring cross-browser compatibility. Highly in demand for modern web applications.",
        required_skills: ['React', 'JavaScript', 'HTML/CSS', 'Tailwind CSS', 'UI/UX Design', 'API Integration', 'Version Control (Git)'],
        related_interests: ['Coding', 'Design', 'Problem Solving'],
        base_salary: '₹8 L',
        resources: {
            'React': [{ name: "Official React Docs", url: "https://react.dev/" }, { name: "React Course (YouTube)", url: "https://youtube.com/watch?v=A71sOqQ-h1w" }],
            'Tailwind CSS': [{ name: "Tailwind CSS Documentation", url: "https://tailwindcss.com/docs" }]
        }
    },
    {
        id: 2,
        title: "Data Scientist",
        description: "Analyzes and interprets complex data sets to solve business problems, create predictive models, and drive strategic decision-making.",
        required_skills: ['Python', 'Data Science', 'Machine Learning', 'SQL', 'Cloud Computing', 'Testing'],
        related_interests: ['Data Analysis', 'Research', 'Problem Solving'],
        base_salary: '₹12 L',
        resources: {
            'Python': [{ name: "Python for Data Science (Coursera)", url: "https://coursera.org/" }],
            'Machine Learning': [{ name: "ML Engineering Roadmap", url: "https://github.com/dair-ai/ML-Engineering-Roadmap" }]
        }
    },
    {
        id: 3,
        title: "Full Stack Engineer",
        description: "Manages both the frontend and backend, handling databases, servers, APIs, and the user interface. Requires broad knowledge across the stack.",
        required_skills: ['React', 'JavaScript', 'Node.js', 'MongoDB', 'API Integration', 'Testing', 'Version Control (Git)'],
        related_interests: ['Coding', 'Problem Solving', 'Management'],
        base_salary: '₹9.5 L',
        resources: {
            'Node.js': [{ name: "Node.js Complete Guide (Udemy)", url: "https://udemy.com/" }],
            'MongoDB': [{ name: "MongoDB University Basics", url: "https://university.mongodb.com/" }]
        }
    }
];

// --- 2. FIREBASE & AUTH SETUP ---
const useFirebase = () => {
    const [db, setDb] = useState(null);
    const [auth, setAuth] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // If firebaseConfig is empty, skip initialization (safe fallback for local dev)
        if (!firebaseConfig || Object.keys(firebaseConfig).length === 0) {
            console.warn('Firebase config not provided. Skipping Firebase initialization.');
            setLoading(false);
            return;
        }

        try {
            // Prevent double initialization in HMR/dev
            if (!getApps().length) {
                initializeApp(firebaseConfig);
            }

            const firestoreDb = getFirestore();
            const firebaseAuth = getAuth();

            setDb(firestoreDb);
            setAuth(firebaseAuth);

            const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
                try {
                    if (user) {
                        setUserId(user.uid);
                        setIsAuthReady(true);
                        setLoading(false);
                    } else if (initialAuthToken) {
                        // Use custom token if available
                        await signInWithCustomToken(firebaseAuth, initialAuthToken);
                    } else {
                        // Fallback to anonymous sign-in
                        const anon = await signInAnonymously(firebaseAuth);
                        setUserId(anon.user.uid);
                        setIsAuthReady(true);
                        setLoading(false);
                    }
                } catch (err) {
                    console.error('Auth flow error:', err);
                    setLoading(false);
                }
            });

            return () => unsubscribe();
        } catch (error) {
            console.error('Firebase initialization failed:', error);
            setLoading(false);
        }
    }, []);

    return { db, auth, userId, isAuthReady, loading };
};

// --- 3. RECOMMENDATION LOGIC FUNCTIONS ---

const runRecommendationLogic = (userProfile) => {
    const { currentSkills = [], interests = [] } = userProfile;

    const scores = MASTER_CAREERS.map(career => {
        let score = 0;

        // Skill Match Score (5 points per match)
        const matchedSkills = career.required_skills.filter(skill => 
            currentSkills.includes(skill)
        );
        score += matchedSkills.length * 5;

        // Interest Match Score (3 points per match)
        const matchedInterests = career.related_interests.filter(interest => 
            interests.includes(interest)
        );
        score += matchedInterests.length * 3;

        return {
            ...career,
            score,
            matchedSkills,
            matchedInterests,
            skillGap: career.required_skills.filter(skill => !currentSkills.includes(skill)),
            skillCount: career.required_skills.length,
            matchPercentage: Math.round((matchedSkills.length / career.required_skills.length) * 100) || 0
        };
    });

    // Sort by score (descending) and return top 3
    return scores
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);
};

// --- 4. DATA PERSISTENCE HOOK (Firestore) ---

const useCareerProfile = (db, userId, isAuthReady) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const docPath = useMemo(() => {
        if (!userId) return null;
        // keep path simple and valid
        return `artifacts/${appId}/users/${userId}/career_profiles/main_profile`;
    }, [userId]);

    useEffect(() => {
        if (!isAuthReady || !db || !docPath) return;

        try {
            const userDocRef = doc(db, docPath);
            const unsubscribe = onSnapshot(userDocRef, (snap) => {
                if (snap.exists()) {
                    setProfile(snap.data());
                } else {
                    setProfile({ name: '', education: '', interests: [], currentSkills: [] });
                }
                setLoading(false);
            }, (err) => {
                console.error('Firestore snapshot error:', err);
                setLoading(false);
            });

            return () => unsubscribe();
        } catch (err) {
            console.error('useCareerProfile error:', err);
            setLoading(false);
        }
    }, [isAuthReady, db, docPath]);

    const saveProfile = useCallback(async (newProfile) => {
        if (!db || !docPath) {
            console.error('Database not ready for saving profile.');
            return;
        }

        try {
            await setDoc(doc(db, docPath), newProfile);
        } catch (err) {
            console.error('Error saving profile:', err);
        }
    }, [db, docPath]);

    return { profile, loading, saveProfile };
};


// --- 5. UI COMPONENTS ---

// Component for the Profile Input Form
const ProfileForm = ({ profile, saveProfile, setView }) => {
    const [formData, setFormData] = useState(() => profile || { name: '', education: '', interests: [], currentSkills: [] });

    useEffect(() => {
        if (profile) setFormData(profile);
    }, [profile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const toggleArray = (key, value) => {
        setFormData(prev => {
            const arr = prev[key] || [];
            if (arr.includes(value)) return { ...prev, [key]: arr.filter(x => x !== value) };
            return { ...prev, [key]: [...arr, value] };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        saveProfile(formData);
        setView('dashboard');
    };

    const isFormValid = formData.name && formData.education && (formData.interests?.length > 0) && (formData.currentSkills?.length > 0);

    return (
        <div className="p-6 bg-white rounded-xl shadow-2xl transition-all duration-300 w-full max-w-2xl mx-auto my-8">
            <h2 className="text-3xl font-extrabold text-indigo-700 mb-6 border-b pb-2">Your Professional Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input name="name" value={formData.name || ''} onChange={handleChange} required placeholder="e.g. Haridwar Student" className="w-full p-3 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Highest Education</label>
                        <select name="education" value={formData.education || ''} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg bg-white">
                            <option value="" disabled>Select Level</option>
                            <option value="B.Tech 4th Year">B.Tech 4th Year</option>
                            <option value="B.Tech Final Year">B.Tech Final Year</option>
                            <option value="Master's Degree">Master's Degree</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-lg font-bold text-gray-800 mb-3">Select Your Core Interests ({formData.interests?.length || 0})</label>
                    <div className="flex flex-wrap gap-2">
                        {ALL_INTERESTS.map(interest => (
                            <button key={interest} type="button" onClick={() => toggleArray('interests', interest)} className={`px-4 py-2 text-sm font-semibold rounded-full ${formData.interests?.includes(interest) ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
                                {interest}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-lg font-bold text-gray-800 mb-3">Identify Your Current Skills ({formData.currentSkills?.length || 0})</label>
                    <p className="text-sm text-gray-500 mb-3">Select the technologies you are proficient in.</p>
                    <div className="flex flex-wrap gap-2">
                        {ALL_SKILLS.map(skill => (
                            <button key={skill} type="button" onClick={() => toggleArray('currentSkills', skill)} className={`px-4 py-2 text-sm font-semibold rounded-lg ${formData.currentSkills?.includes(skill) ? 'bg-teal-500 text-white' : 'bg-white text-gray-700 border border-teal-300'}`}>
                                {skill}
                            </button>
                        ))}
                    </div>
                </div>

                <button type="submit" disabled={!isFormValid} className={`w-full p-4 text-xl font-bold text-white rounded-lg ${isFormValid ? 'bg-indigo-600' : 'bg-gray-400 cursor-not-allowed'}`}>
                    Analyze My Profile & Get Guidance
                </button>
            </form>
        </div>
    );
};

// Component for the Recommendation Dashboard
const Dashboard = ({ profile, setView }) => {
    const recommendations = useMemo(() => {
        if (!profile) return [];
        return runRecommendationLogic(profile);
    }, [profile]);

    const topCareer = recommendations[0] || null;

    const CareerCard = ({ career, rank, isTop }) => (
        <div className={`p-6 rounded-xl shadow-lg border ${isTop ? 'bg-indigo-50 border-indigo-400' : 'bg-white border-gray-200'}`}>
            <span className={`inline-block px-3 py-1 text-sm font-bold rounded-full ${isTop ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}>#{rank} Rank</span>
            <h3 className="text-2xl font-extrabold text-gray-900 mt-2">{career.title}</h3>
            <p className="text-sm text-gray-500 mb-4">{career.description}</p>
            <div className="flex justify-between items-center text-sm mb-4 border-t pt-2 mt-4">
                <span className="font-semibold text-gray-700">Estimated Salary:</span>
                <span className="text-lg font-bold text-green-600">{career.base_salary}</span>
            </div>
            <div className="mt-2">
                <h4 className="font-semibold text-gray-700 mb-2">My Alignment:</h4>
                <div className="flex flex-wrap gap-1">
                    {career.matchedSkills.map(s => <span key={s} className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">✓ {s}</span>)}
                    {career.matchedInterests.map(i => <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">⭐ {i}</span>)}
                </div>
            </div>
        </div>
    );

    const SkillGapChart = ({ career }) => {
        const skillsCount = career.skillCount || 0;
        const matchedCount = (career.matchedSkills || []).length;
        const gapCount = (career.skillGap || []).length;
        const pct = career.matchPercentage || 0;

        return (
            <div className="mt-4">
                <h4 className="text-lg font-bold text-gray-800 mb-2">Skill Gap Visualizer</h4>
                <div className="flex items-center space-x-2 text-sm font-medium">
                    <span className="text-green-600">Matched ({matchedCount})</span>
                    <span className="text-red-600">Missing ({gapCount})</span>
                    <span className="text-gray-500">Total ({skillsCount})</span>
                </div>
                <div className="w-full h-8 bg-gray-200 rounded-lg overflow-hidden mt-1">
                    <div className="h-full bg-green-500 transition-all duration-700" style={{ width: `${pct}%` }} />
                </div>
                <p className="text-3xl font-extrabold text-indigo-600 text-center mt-2">{pct}% Match</p>
            </div>
        );
    };

    const ResourceSuggestion = ({ missingSkills, career }) => (
        <div className="mt-8 bg-gray-50 p-6 rounded-xl shadow-inner">
            <h3 className="text-2xl font-bold text-red-600 mb-4 flex items-center">Skill Gap & Next Steps</h3>
            {(!missingSkills || missingSkills.length === 0) ? (
                <p className="text-lg text-green-600 font-semibold">You possess all required core skills for this role! Focus on advanced projects.</p>
            ) : (
                <div>
                    <p className="text-gray-700 mb-4">The top recommended career requires you to build proficiency in the following <strong>{missingSkills.length} key areas</strong>.</p>
                    <div className="space-y-4">
                        {missingSkills.map(skill => (
                            <div key={skill} className="p-4 bg-white rounded-lg border border-red-200">
                                <h4 className="text-xl font-bold text-red-700 mb-2">{skill} Mastery Path</h4>
                                <div className="space-y-2">
                                    {(career.resources && career.resources[skill] || []).map((res, idx) => (
                                        <a key={idx} href={res.url} target="_blank" rel="noopener noreferrer" className="flex items-center text-indigo-600 hover:text-indigo-800 transition duration-150 text-sm font-medium">
                                            {res.name}
                                        </a>
                                    ))}
                                    {(!career.resources || !(career.resources[skill] || []).length) && (
                                        <p className="text-sm text-gray-500 italic">Search for "Best {skill} course on Coursera/YouTube" to find top-rated resources.</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

    if (!topCareer) return <div className="text-center p-12 text-gray-500">No recommendations available. Please complete your profile.</div>;

    return (
        <div className="p-4 md:p-8">
            <header className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-gray-900">Welcome back, <span className="text-indigo-600">{profile.name}</span>!</h1>
                <p className="text-xl text-gray-600 mt-2">Personalized Career Guidance Dashboard</p>
                <button onClick={() => setView('profile')} className="mt-4 px-4 py-2 text-sm font-semibold text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50">Edit Profile & Re-run Analysis</button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">Top Recommendation: {topCareer.title}</h2>
                    <div className="bg-white p-6 rounded-xl shadow-xl mb-8"><SkillGapChart career={topCareer} /></div>
                    <ResourceSuggestion missingSkills={topCareer.skillGap} career={topCareer} />
                </div>

                <div className="lg:col-span-1 space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Other Top Paths</h2>
                    <div className="space-y-4">{recommendations.slice(1).map((c, i) => <CareerCard key={c.id} career={c} rank={i + 2} isTop={false} />)}</div>
                </div>
            </div>
        </div>
    );
};

// --- 6. MAIN APP COMPONENT ---
const App = () => {
  const [view, setView] = useState('profile');
  const { db, userId, isAuthReady, loading: firebaseLoading } = useFirebase();
  const { profile, loading: profileLoading, saveProfile } = useCareerProfile(db, userId, isAuthReady);

  const isLoading = firebaseLoading || profileLoading || (!isAuthReady && !!(firebaseConfig && Object.keys(firebaseConfig).length));
  const isProfileComplete = profile && profile.name && (profile.currentSkills || []).length > 0;

  useEffect(() => {
    if (!profileLoading && profile && isProfileComplete) setView('dashboard');
    else if (!profileLoading) setView('profile');
  }, [profile, profileLoading, isProfileComplete]);

  const renderContent = () => {
    if (isLoading) return (
      <div className="flex justify-center items-center h-screen bg-gray-50"><div className="text-center p-8 bg-white rounded-lg shadow-xl"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-3" /><p className="text-lg font-semibold text-gray-700">Loading Platform Data & User Session...</p><p className="text-sm text-gray-500 mt-1">{firebaseLoading ? 'Authenticating...' : profileLoading ? 'Fetching Profile...' : 'Ready.'}</p><p className="text-xs mt-4 text-gray-400">User ID: {userId || 'Signing In...'}</p></div></div>
    );

    if (view === 'profile' || !isProfileComplete) return <ProfileForm profile={profile} saveProfile={saveProfile} setView={setView} />;

    return <Dashboard profile={profile} setView={setView} />;
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="flex justify-between items-center h-16"><div className="flex-shrink-0"><span className="text-2xl font-black text-indigo-600 tracking-wider">AI CareerPath</span></div><div className="flex space-x-4"><button onClick={() => setView('profile')} className={`px-3 py-2 rounded-md text-sm font-medium transition duration-150 ${view === 'profile' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-gray-50'}`}>{isProfileComplete ? 'Edit Profile' : 'Start Profile'}</button>{isProfileComplete && <button onClick={() => setView('dashboard')} className={`px-3 py-2 rounded-md text-sm font-medium transition duration-150 ${view === 'dashboard' ? 'bg-indigo-600 text-white shadow' : 'text-gray-500 hover:bg-gray-50'}`}>Dashboard</button>}</div></div></div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{renderContent()}</main>

      <footer className="bg-gray-800 text-white mt-12 py-4"><div className="max-w-7xl mx-auto text-center text-sm">AI Career Guidance & Skill Recommendation Platform (B.Tech Simulation) | User ID: {userId || 'N/A'}</div></footer>
    </div>
  );
};

export default App;
