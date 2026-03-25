"use client";

import { useState, useEffect } from 'react';

export default function Home() {
    const [participantId, setParticipantId] = useState(null);
    const [condition, setCondition] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [decisionMade, setDecisionMade] = useState(null);

    useEffect(() => {
        // Generate random participant ID
        const pid = `p_${Math.random().toString(36).substring(2, 9)}`;
        setParticipantId(pid);

        // Randomly assign condition A or B
        const cond = Math.random() < 0.5 ? "A" : "B";
        setCondition(cond);

        // Record when the recommendation is presented
        setStartTime(Date.now());
    }, []);

    const handleDecision = async (decision) => {
        if (!startTime || !participantId || !condition) return;

        const latency_ms = Date.now() - startTime;
        setDecisionMade(decision);

        const payload = {
            participant_id: participantId,
            condition,
            decision,
            timestamp: new Date().toISOString(),
            latency_ms
        };

        try {
            await fetch('/api/log', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
        } catch (error) {
            console.error("Error logging decision:", error);
        }
    };

    if (!condition) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    const aiName = condition === "A" ? "System-8" : "Assistant Sarah";
    const aiMessage = condition === "A"
        ? "Computed optimal choice: Product X. Statistical analysis indicates highest utility."
        : "Hi there! Based on what I know about you, I highly recommend Product X. I think you'll really like it!";

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold text-gray-900">Recommendation Task</h1>
                    <p className="text-sm text-gray-500">Participant: {participantId}</p>
                </div>

                {decisionMade ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center space-y-4">
                        <h2 className="text-xl font-semibold text-green-800">Thank you!</h2>
                        <p className="text-green-600">Your decision ({decisionMade}) has been recorded.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg">
                                    {condition === "A" ? "S8" : "AS"}
                                </div>
                                <h3 className="font-semibold text-blue-900 text-xl">{aiName}</h3>
                            </div>
                            <p className="text-blue-800 text-lg leading-relaxed">"{aiMessage}"</p>
                        </div>

                        <div className="flex flex-col space-y-3">
                            <button
                                onClick={() => handleDecision("Accept")}
                                className="w-full py-4 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-lg"
                            >
                                Accept Recommendation
                            </button>
                            <button
                                onClick={() => handleDecision("Reject")}
                                className="w-full py-4 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors text-lg"
                            >
                                Choose Alternative (Reject)
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
