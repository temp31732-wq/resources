import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Dimensions,
  StatusBar,
} from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import {
  Phone,
  AlertTriangle,
  Search,
  Clock,
  Shield,
  Building2,
  CreditCard,
  ChevronDown,
  ChevronUp,
  Copy,
  CheckCircle,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

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

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'government' | 'private'>('all');
  const [expandedBank, setExpandedBank] = useState<string | null>(null);

  const filteredBanks = bankData.filter(bank => {
    const matchesSearch = bank.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || bank.type === selectedType;
    return matchesSearch && matchesType;
  });

  const copyToClipboard = async (text: string) => {
    try {
      await Clipboard.setStringAsync(text);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert('Copied!', `${text} copied to clipboard`);
    } catch (error) {
      Alert.alert('Error', 'Failed to copy to clipboard');
    }
  };

  const renderPhoneButton = (number: string, style: 'primary' | 'secondary' | 'special', label?: string) => {
    const buttonStyle = style === 'primary' ? styles.primaryPhoneButton : 
                       style === 'secondary' ? styles.secondaryPhoneButton : 
                       styles.specialPhoneButton;
    
    const textStyle = style === 'primary' ? styles.primaryPhoneText : 
                     style === 'secondary' ? styles.secondaryPhoneText : 
                     styles.specialPhoneText;

    return (
      <TouchableOpacity
        key={number}
        style={buttonStyle}
        onPress={() => copyToClipboard(number)}
        activeOpacity={0.7}
      >
        {label && <Text style={styles.phoneLabel}>{label}</Text>}
        <View style={styles.phoneButtonContent}>
          <Text style={[textStyle, styles.phoneNumber]}>{number}</Text>
          <Copy size={16} color={style === 'primary' ? '#ffffff' : style === 'secondary' ? '#374151' : '#ea580c'} />
        </View>
        <Text style={styles.tapToCopy}>Tap to copy</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ExpoStatusBar style="light" />
      <StatusBar barStyle="light-content" backgroundColor="#dc2626" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Emergency Header */}
        <View style={styles.emergencyHeader}>
          <View style={styles.headerContent}>
            <View style={styles.headerIcon}>
              <AlertTriangle size={32} color="#ffffff" />
            </View>
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>Banking Emergency</Text>
              <Text style={styles.headerSubtitle}>Quick access to verified bank contacts</Text>
            </View>
          </View>
        </View>

        {/* RBI Emergency Section */}
        <View style={styles.rbiSection}>
          <View style={styles.rbiHeader}>
            <Shield size={28} color="#ffffff" />
            <Text style={styles.rbiTitle}>RBI Emergency Helpline</Text>
          </View>
          
          <View style={styles.rbiContent}>
            <View style={styles.rbiHelpline}>
              <View style={styles.rbiPhoneHeader}>
                <Phone size={20} color="#ffffff" />
                <Text style={styles.rbiPhoneTitle}>RBI Consumer Helpline</Text>
              </View>
              <TouchableOpacity
                style={styles.rbiPhoneButton}
                onPress={() => copyToClipboard('14448')}
                activeOpacity={0.7}
              >
                <Text style={styles.rbiPhoneNumber}>14448</Text>
                <Text style={styles.rbiPhoneLabel}>Toll-Free</Text>
              </TouchableOpacity>
              <View style={styles.rbiTiming}>
                <Clock size={16} color="#bfdbfe" />
                <Text style={styles.rbiTimingText}>9:30 AM - 5:15 PM</Text>
              </View>
            </View>
            
            <View style={styles.rbiInfo}>
              <Text style={styles.rbiInfoTitle}>When to Contact RBI</Text>
              <Text style={styles.rbiInfoText}>• Bank doesn't respond within 30 days</Text>
              <Text style={styles.rbiInfoText}>• Unsatisfactory resolution from bank</Text>
              <Text style={styles.rbiInfoText}>• Serious banking irregularities</Text>
              <Text style={styles.rbiInfoText}>• Online: sachet.rbi.org.in</Text>
              <Text style={styles.rbiInfoText}>• Email: crpc@rbi.org.in</Text>
            </View>
          </View>
        </View>

        {/* Search and Filter */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Search size={20} color="#9ca3af" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search banks..."
              placeholderTextColor="#9ca3af"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          </View>
          
          <View style={styles.filterContainer}>
            <TouchableOpacity
              style={[styles.filterButton, selectedType === 'all' && styles.filterButtonActive]}
              onPress={() => setSelectedType('all')}
              activeOpacity={0.7}
            >
              <Text style={[styles.filterButtonText, selectedType === 'all' && styles.filterButtonTextActive]}>
                All Banks
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.filterButton, selectedType === 'government' && styles.filterButtonActiveGov]}
              onPress={() => setSelectedType('government')}
              activeOpacity={0.7}
            >
              <Text style={[styles.filterButtonText, selectedType === 'government' && styles.filterButtonTextActiveGov]}>
                Government
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.filterButton, selectedType === 'private' && styles.filterButtonActivePrivate]}
              onPress={() => setSelectedType('private')}
              activeOpacity={0.7}
            >
              <Text style={[styles.filterButtonText, selectedType === 'private' && styles.filterButtonTextActivePrivate]}>
                Private
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Banks List */}
        <View style={styles.banksContainer}>
          {filteredBanks.map((bank) => (
            <View key={bank.name} style={styles.bankCard}>
              <View style={styles.bankHeader}>
                <View style={styles.bankInfo}>
                  <View style={[styles.bankIcon, bank.type === 'government' ? styles.govIcon : styles.privateIcon]}>
                    <Building2 size={20} color={bank.type === 'government' ? '#059669' : '#7c3aed'} />
                  </View>
                  <View style={styles.bankDetails}>
                    <Text style={styles.bankName}>{bank.name}</Text>
                    <View style={[styles.bankTypeTag, bank.type === 'government' ? styles.govTag : styles.privateTag]}>
                      <Text style={[styles.bankTypeText, bank.type === 'government' ? styles.govTagText : styles.privateTagText]}>
                        {bank.type === 'government' ? 'Government Bank' : 'Private Bank'}
                      </Text>
                    </View>
                  </View>
                </View>
                
                <View style={styles.bankActions}>
                  {bank.verified && (
                    <View style={styles.verifiedBadge}>
                      <CheckCircle size={16} color="#059669" />
                      <Text style={styles.verifiedText}>Verified</Text>
                    </View>
                  )}
                  <TouchableOpacity
                    style={styles.expandButton}
                    onPress={() => setExpandedBank(expandedBank === bank.name ? null : bank.name)}
                    activeOpacity={0.7}
                  >
                    {expandedBank === bank.name ? 
                      <ChevronUp size={20} color="#2563eb" /> : 
                      <ChevronDown size={20} color="#2563eb" />
                    }
                  </TouchableOpacity>
                </View>
              </View>

              {/* Primary Toll-Free Numbers */}
              <View style={styles.phoneSection}>
                <View style={styles.phoneSectionHeader}>
                  <Phone size={18} color="#1f2937" />
                  <Text style={styles.phoneSectionTitle}>Primary Toll-Free Numbers</Text>
                </View>
                <View style={styles.phoneGrid}>
                  {bank.tollFree.slice(0, expandedBank === bank.name ? undefined : 2).map((number) =>
                    renderPhoneButton(number, 'primary')
                  )}
                </View>
                {bank.tollFree.length > 2 && expandedBank !== bank.name && (
                  <Text style={styles.moreNumbers}>+{bank.tollFree.length - 2} more numbers</Text>
                )}
              </View>

              {/* Expanded Details */}
              {expandedBank === bank.name && (
                <View style={styles.expandedContent}>
                  {/* Regular Numbers */}
                  {bank.regular && (
                    <View style={styles.phoneSection}>
                      <Text style={styles.phoneSectionTitle}>Regular Numbers</Text>
                      <View style={styles.phoneGrid}>
                        {bank.regular.map((number) => renderPhoneButton(number, 'secondary'))}
                      </View>
                    </View>
                  )}

                  {/* Special Numbers */}
                  {bank.specialNumbers && (
                    <View style={styles.phoneSection}>
                      <View style={styles.phoneSectionHeader}>
                        <CreditCard size={18} color="#1f2937" />
                        <Text style={styles.phoneSectionTitle}>Special Services</Text>
                      </View>
                      <View style={styles.phoneGrid}>
                        {bank.specialNumbers.map((special) =>
                          renderPhoneButton(special.number, 'special', special.type)
                        )}
                      </View>
                    </View>
                  )}

                  {/* Notes */}
                  {bank.notes && (
                    <View style={styles.notesSection}>
                      <Text style={styles.notesTitle}>Important Notes</Text>
                      <Text style={styles.notesText}>{bank.notes}</Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Emergency Tips */}
        <View style={styles.tipsSection}>
          <View style={styles.tipsHeader}>
            <AlertTriangle size={24} color="#d97706" />
            <Text style={styles.tipsTitle}>Emergency Banking Tips</Text>
          </View>
          
          <View style={styles.tipsContent}>
            <View style={styles.tipCategory}>
              <Text style={styles.tipCategoryTitle}>Before Calling</Text>
              <Text style={styles.tipText}>• Keep account number ready</Text>
              <Text style={styles.tipText}>• Note transaction details & dates</Text>
              <Text style={styles.tipText}>• Have ID documents accessible</Text>
              <Text style={styles.tipText}>• Prepare screenshots if online issue</Text>
            </View>
            
            <View style={styles.tipCategory}>
              <Text style={styles.tipCategoryTitle}>During the Call</Text>
              <Text style={styles.tipText}>• Always ask for reference number</Text>
              <Text style={styles.tipText}>• Note agent's name & ID</Text>
              <Text style={styles.tipText}>• Be clear about expected resolution</Text>
              <Text style={styles.tipText}>• Follow up if no response in 48 hours</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Emergency Banking Resources • Always verify numbers on official bank websites • 
            Contact RBI if banks don't respond within 30 days
          </Text>
          <Text style={styles.footerSubtext}>
            This resource is for emergency use only. Always prioritize official bank channels first.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  emergencyHeader: {
    backgroundColor: '#dc2626',
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 12,
    borderRadius: 12,
    marginRight: 16,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fecaca',
  },
  rbiSection: {
    backgroundColor: '#2563eb',
    margin: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  rbiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  rbiTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 12,
  },
  rbiContent: {
    flexDirection: 'row',
    gap: 16,
  },
  rbiHelpline: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
  },
  rbiPhoneHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  rbiPhoneTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginLeft: 8,
  },
  rbiPhoneButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 8,
  },
  rbiPhoneNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'monospace',
  },
  rbiPhoneLabel: {
    fontSize: 12,
    color: '#bfdbfe',
    marginTop: 2,
  },
  rbiTiming: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rbiTimingText: {
    fontSize: 12,
    color: '#bfdbfe',
    marginLeft: 4,
  },
  rbiInfo: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
  },
  rbiInfoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  rbiInfoText: {
    fontSize: 12,
    color: '#bfdbfe',
    marginBottom: 4,
  },
  searchSection: {
    backgroundColor: '#ffffff',
    margin: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#2563eb',
  },
  filterButtonActiveGov: {
    backgroundColor: '#059669',
  },
  filterButtonActivePrivate: {
    backgroundColor: '#7c3aed',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  filterButtonTextActive: {
    color: '#ffffff',
  },
  filterButtonTextActiveGov: {
    color: '#ffffff',
  },
  filterButtonTextActivePrivate: {
    color: '#ffffff',
  },
  banksContainer: {
    paddingHorizontal: 20,
  },
  bankCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  bankHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  bankInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  bankIcon: {
    padding: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  govIcon: {
    backgroundColor: '#d1fae5',
  },
  privateIcon: {
    backgroundColor: '#e9d5ff',
  },
  bankDetails: {
    flex: 1,
  },
  bankName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 6,
  },
  bankTypeTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  govTag: {
    backgroundColor: '#d1fae5',
  },
  privateTag: {
    backgroundColor: '#e9d5ff',
  },
  bankTypeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  govTagText: {
    color: '#065f46',
  },
  privateTagText: {
    color: '#581c87',
  },
  bankActions: {
    alignItems: 'flex-end',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d1fae5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  verifiedText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#065f46',
    marginLeft: 4,
  },
  expandButton: {
    padding: 4,
  },
  phoneSection: {
    marginBottom: 16,
  },
  phoneSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  phoneSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginLeft: 8,
  },
  phoneGrid: {
    gap: 8,
  },
  primaryPhoneButton: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    padding: 16,
  },
  secondaryPhoneButton: {
    backgroundColor: '#f3f4f6',
    borderColor: '#d1d5db',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
  },
  specialPhoneButton: {
    backgroundColor: '#fed7aa',
    borderColor: '#fdba74',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
  },
  phoneLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ea580c',
    marginBottom: 4,
  },
  phoneButtonContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  phoneNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  primaryPhoneText: {
    color: '#ffffff',
  },
  secondaryPhoneText: {
    color: '#374151',
  },
  specialPhoneText: {
    color: '#ea580c',
  },
  tapToCopy: {
    fontSize: 12,
    color: '#6b7280',
  },
  moreNumbers: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 8,
    textAlign: 'center',
  },
  expandedContent: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 16,
  },
  notesSection: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  notesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  notesText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  tipsSection: {
    backgroundColor: '#fffbeb',
    margin: 20,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#fde68a',
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  tipsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#92400e',
    marginLeft: 12,
  },
  tipsContent: {
    gap: 16,
  },
  tipCategory: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
  },
  tipCategoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400e',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#92400e',
    marginBottom: 4,
    lineHeight: 20,
  },
  footer: {
    backgroundColor: '#1f2937',
    padding: 20,
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#d1d5db',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 8,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 18,
  },
});