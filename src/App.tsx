import React, { useState } from 'react';
import { Phone, AlertTriangle, Search, Clock, Shield, Building2, CreditCard, MapPin } from 'lucide-react';

interface BankContact {
  name: string;
  type: 'government' | 'private';
  tollFree: string[];
  regular?: string[];
  specialNumbers?: { type: string; number: string }[];
  verified: boolean;
  notes?: string;
}

const bankData: BankContact[] = [
  {
    name: 'State Bank of India (SBI)',
    type: 'government',
    tollFree: ['1800 1234', '1800 2100', '1800 11 2211', '1800 425 3800'],
    regular: ['080-26599990'],
    specialNumbers: [
      { type: 'Unauthorized Transactions', number: '1800 11 1109' },
      { type: 'Emergency', number: '94491 12211' }
    ],
    verified: true,
    notes: 'Most numbers available 24×7 nationwide'
  },
  {
    name: 'HDFC Bank',
    type: 'private',
    tollFree: ['1800 1600', '1800 2600', '1800 227227'],
    regular: ['+91 22 6160 6160'],
    specialNumbers: [
      { type: 'Credit Card', number: '1860-267-6161' },
      { type: 'Banking Grievances', number: '1800-224-060' }
    ],
    verified: true,
    notes: 'Credit card lines available; Banking grievances Mon-Sat 9:30 AM-6:30 PM'
  },
  {
    name: 'ICICI Bank',
    type: 'private',
    tollFree: ['1800 1080'],
    regular: ['022-3366-7777'],
    verified: true,
    notes: 'General queries and customer care; email escalation available'
  },
  {
    name: 'Axis Bank',
    type: 'private',
    tollFree: ['1860 425 8888'],
    regular: ['022-6798-7700'],
    verified: true,
    notes: 'Mumbai regional contact for account/credit card grievances'
  },
  {
    name: 'Punjab National Bank (PNB)',
    type: 'government',
    tollFree: ['1800 1800', '1800 2021', '1800 180 2222', '1800 103 2222', '1800-180-2345'],
    regular: ['+91 120-249-0000'],
    verified: true,
    notes: 'Multiple contact centers; Global users support available'
  },
  {
    name: 'Bank of Baroda',
    type: 'government',
    tollFree: ['1800 258 4455', '1800 102 4455', '1800-103-1002'],
    verified: true,
    notes: 'Banking and grievances support'
  },
  {
    name: 'Union Bank of India',
    type: 'government',
    tollFree: ['1800 2222 44', '1800 208 2244', '1800 425 1515', '1800 425 3555'],
    verified: true
  },
  {
    name: 'Bank of India',
    type: 'government',
    tollFree: ['1800 103 1906', '1800 220 229'],
    verified: true
  },
  {
    name: 'Canara Bank',
    type: 'government',
    tollFree: ['1800 425 0018'],
    verified: true
  },
  {
    name: 'Central Bank of India',
    type: 'government',
    tollFree: ['1800 22 1911', '1800 3030'],
    verified: true
  },
  {
    name: 'Kotak Mahindra Bank',
    type: 'private',
    tollFree: ['1860 266 2666'],
    verified: true,
    notes: 'Credit cards, banking, and grievances'
  },
  {
    name: 'IndusInd Bank',
    type: 'private',
    tollFree: ['1860 267 7777'],
    verified: true
  },
  {
    name: 'Yes Bank',
    type: 'private',
    tollFree: ['1800 1200'],
    verified: true
  },
  {
    name: 'Federal Bank',
    type: 'private',
    tollFree: ['1800 425 1199'],
    verified: true,
    notes: 'Banking and credit support'
  },
  {
    name: 'HSBC India',
    type: 'private',
    tollFree: ['1800 267 3456'],
    verified: true,
    notes: 'Cards, banking, and complaints'
  },
  {
    name: 'IDFC First Bank',
    type: 'private',
    tollFree: ['1860 500 1111'],
    verified: true,
    notes: 'Banking, credit card, grievance redressal'
  },
  {
    name: 'Punjab Gramin Bank',
    type: 'government',
    tollFree: ['1800 180 7777'],
    verified: true,
    notes: 'Regional rural bank'
  }
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'government' | 'private'>('all');
  const [expandedBank, setExpandedBank] = useState<string | null>(null);

  const filteredBanks = bankData.filter(bank => {
    const matchesSearch = bank.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || bank.type === selectedType;
    return matchesSearch && matchesType;
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      {/* Emergency Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white/20 p-2 rounded-lg">
              <AlertTriangle className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Banking Emergency Resources</h1>
              <p className="text-red-100 text-lg">Quick access to verified bank contact numbers</p>
            </div>
          </div>
        </div>
      </div>

      {/* RBI Emergency Section */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-6 mb-8 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-8 w-8" />
            <h2 className="text-2xl font-bold">Reserve Bank of India (RBI) - Emergency Helpline</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <Phone className="h-5 w-5" />
                RBI Consumer Helpline
              </h3>
              <div className="space-y-2">
                <button 
                  onClick={() => copyToClipboard('14448')}
                  className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-mono text-xl transition-colors cursor-pointer"
                >
                  14448 (Toll-Free)
                </button>
                <p className="text-blue-100 text-sm flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  9:30 AM - 5:15 PM
                </p>
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">When to Contact RBI</h3>
              <ul className="text-blue-100 text-sm space-y-1">
                <li>• Bank doesn't respond within 30 days</li>
                <li>• Unsatisfactory resolution from bank</li>
                <li>• Serious banking irregularities</li>
                <li>• Online: sachet.rbi.org.in</li>
                <li>• Email: crpc@rbi.org.in</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search banks..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  selectedType === 'all' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Banks
              </button>
              <button
                onClick={() => setSelectedType('government')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  selectedType === 'government' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Government
              </button>
              <button
                onClick={() => setSelectedType('private')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  selectedType === 'private' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Private
              </button>
            </div>
          </div>
        </div>

        {/* Banks Grid */}
        <div className="grid gap-6">
          {filteredBanks.map((bank) => (
            <div key={bank.name} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      bank.type === 'government' ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'
                    }`}>
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{bank.name}</h3>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        bank.type === 'government' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-purple-100 text-purple-700'
                      }`}>
                        {bank.type === 'government' ? 'Government Bank' : 'Private Bank'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {bank.verified && (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <Shield className="h-4 w-4" />
                        Verified
                      </span>
                    )}
                    <button
                      onClick={() => setExpandedBank(expandedBank === bank.name ? null : bank.name)}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      {expandedBank === bank.name ? 'Show Less' : 'Show More'}
                    </button>
                  </div>
                </div>

                {/* Primary Toll-Free Numbers */}
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Primary Toll-Free Numbers
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {bank.tollFree.slice(0, expandedBank === bank.name ? undefined : 3).map((number, index) => (
                      <button
                        key={index}
                        onClick={() => copyToClipboard(number)}
                        className="bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-3 text-left transition-colors group"
                      >
                        <div className="font-mono text-lg font-bold text-blue-600">{number}</div>
                        <div className="text-sm text-blue-500 group-hover:text-blue-600">Click to copy</div>
                      </button>
                    ))}
                  </div>
                  {bank.tollFree.length > 3 && expandedBank !== bank.name && (
                    <p className="text-gray-500 text-sm mt-2">
                      +{bank.tollFree.length - 3} more numbers
                    </p>
                  )}
                </div>

                {/* Expanded Details */}
                {expandedBank === bank.name && (
                  <div className="space-y-4">
                    {/* Regular Numbers */}
                    {bank.regular && (
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-3">Regular Numbers</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {bank.regular.map((number, index) => (
                            <button
                              key={index}
                              onClick={() => copyToClipboard(number)}
                              className="bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg p-3 text-left transition-colors group"
                            >
                              <div className="font-mono text-lg font-bold text-gray-700">{number}</div>
                              <div className="text-sm text-gray-500 group-hover:text-gray-600">Click to copy</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Special Numbers */}
                    {bank.specialNumbers && (
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <CreditCard className="h-5 w-5" />
                          Special Services
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {bank.specialNumbers.map((special, index) => (
                            <button
                              key={index}
                              onClick={() => copyToClipboard(special.number)}
                              className="bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-lg p-3 text-left transition-colors group"
                            >
                              <div className="text-sm font-medium text-orange-700 mb-1">{special.type}</div>
                              <div className="font-mono text-lg font-bold text-orange-600">{special.number}</div>
                              <div className="text-sm text-orange-500 group-hover:text-orange-600">Click to copy</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Notes */}
                    {bank.notes && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">Important Notes</h4>
                        <p className="text-gray-600">{bank.notes}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Tips */}
        <div className="mt-12 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-8 border border-amber-200">
          <h2 className="text-2xl font-bold text-amber-800 mb-6 flex items-center gap-3">
            <AlertTriangle className="h-6 w-6" />
            Emergency Banking Tips
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-amber-700 mb-3">Before Calling</h3>
              <ul className="space-y-2 text-amber-700">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                  Keep account number ready
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                  Note transaction details & dates
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                  Have ID documents accessible
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                  Prepare screenshots if online issue
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-amber-700 mb-3">During the Call</h3>
              <ul className="space-y-2 text-amber-700">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                  Always ask for reference number
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                  Note agent's name & ID
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                  Be clear about expected resolution
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                  Follow up if no response in 48 hours
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-300">
            Emergency Banking Resources • Always verify numbers on official bank websites • 
            Contact RBI if banks don't respond within 30 days
          </p>
          <p className="text-gray-400 mt-2 text-sm">
            This resource is for emergency use only. Always prioritize official bank channels first.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;