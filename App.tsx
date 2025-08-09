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
  Platform,
} from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import * as Linking from 'expo-linking';
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
  PhoneCall,
  CheckCircle,
  Star,
  Zap,
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

  const makePhoneCall = async (phoneNumber: string) => {
    try {
      if (Platform.OS !== 'web') {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
      
      const cleanNumber = phoneNumber.replace(/[^\d+]/g, '');
      const phoneUrl = `tel:${cleanNumber}`;
      
      const canOpen = await Linking.canOpenURL(phoneUrl);
      if (canOpen) {
        await Linking.openURL(phoneUrl);
      } else {
        Alert.alert('Error', 'Unable to open phone app');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to make phone call');
    }
  };

  const renderPhoneButton = (number: string, style: 'primary' | 'secondary' | 'special', label?: string) => {
    const buttonStyle = style === 'primary' ? styles.primaryPhoneButton : 
                       style === 'secondary' ? styles.secondaryPhoneButton : 
                       styles.specialPhoneButton;
    
    const textStyle = style === 'primary' ? styles.primaryPhoneText : 
                     style === 'secondary' ? styles.secondaryPhoneText : 
                     styles.specialPhoneText;

    const iconColor = style === 'primary' ? '#ffffff' : 
                     style === 'secondary' ? '#1f2937' : 
                     '#ea580c';

    return (
      <TouchableOpacity
        key={number}
        style={buttonStyle}
        onPress={() => makePhoneCall(number)}
        activeOpacity={0.8}
      >
        {label && <Text style={styles.phoneLabel}>{label}</Text>}
        <View style={styles.phoneButtonContent}>
          <Text style={[textStyle, styles.phoneNumber]}>{number}</Text>
          <View style={styles.phoneIconContainer}>
            <PhoneCall size={18} color={iconColor} />
          </View>
        </View>
        <Text style={[styles.tapToCall, { color: style === 'primary' ? '#e0e7ff' : '#6b7280' }]}>
          Tap to call
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ExpoStatusBar style="light" />
      <StatusBar barStyle="light-content" backgroundColor="#dc2626" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Animated Emergency Header */}
        <View style={styles.emergencyHeader}>
          <View style={styles.headerGradient}>
            <View style={styles.headerContent}>
              <View style={styles.headerIconContainer}>
                <View style={styles.headerIcon}>
                  <AlertTriangle size={32} color="#ffffff" />
                </View>
                <View style={styles.pulseRing} />
              </View>
              <View style={styles.headerText}>
                <Text style={styles.headerTitle}>🚨 Banking Emergency</Text>
                <Text style={styles.headerSubtitle}>Instant access to verified bank helplines</Text>
                <View style={styles.headerStats}>
                  <View style={styles.statItem}>
                    <Star size={16} color="#fbbf24" />
                    <Text style={styles.statText}>{bankData.length} Banks</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Zap size={16} color="#10b981" />
                    <Text style={styles.statText}>24/7 Support</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Enhanced RBI Emergency Section */}
        <View style={styles.rbiSection}>
          <View style={styles.rbiGradient}>
            <View style={styles.rbiHeader}>
              <View style={styles.rbiIconContainer}>
                <Shield size={28} color="#ffffff" />
                <View style={styles.rbiIconGlow} />
              </View>
              <Text style={styles.rbiTitle}>🏛️ RBI Emergency Helpline</Text>
            </View>
            
            <View style={styles.rbiContent}>
              <View style={styles.rbiHelpline}>
                <View style={styles.rbiPhoneHeader}>
                  <Phone size={20} color="#ffffff" />
                  <Text style={styles.rbiPhoneTitle}>Consumer Helpline</Text>
                </View>
                <TouchableOpacity
                  style={styles.rbiPhoneButton}
                  onPress={() => makePhoneCall('14448')}
                  activeOpacity={0.8}
                >
                  <Text style={styles.rbiPhoneNumber}>14448</Text>
                  <Text style={styles.rbiPhoneLabel}>Toll-Free</Text>
                  <PhoneCall size={20} color="#ffffff" style={styles.rbiPhoneIcon} />
                </TouchableOpacity>
                <View style={styles.rbiTiming}>
                  <Clock size={16} color="#bfdbfe" />
                  <Text style={styles.rbiTimingText}>9:30 AM - 5:15 PM</Text>
                </View>
              </View>
              
              <View style={styles.rbiInfo}>
                <Text style={styles.rbiInfoTitle}>📋 When to Contact RBI</Text>
                <Text style={styles.rbiInfoText}>• Bank doesn't respond within 30 days</Text>
                <Text style={styles.rbiInfoText}>• Unsatisfactory resolution from bank</Text>
                <Text style={styles.rbiInfoText}>• Serious banking irregularities</Text>
                <View style={styles.rbiContactMethods}>
                  <Text style={styles.rbiContactTitle}>Other Contact Methods:</Text>
                  <Text style={styles.rbiContactText}>🌐 sachet.rbi.org.in</Text>
                  <Text style={styles.rbiContactText}>📧 crpc@rbi.org.in</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Enhanced Search and Filter */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Search size={20} color="#6366f1" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search your bank..."
              placeholderTextColor="#9ca3af"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
            {searchTerm.length > 0 && (
              <TouchableOpacity onPress={() => setSearchTerm('')}>
                <Text style={styles.clearSearch}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
          
          <View style={styles.filterContainer}>
            <TouchableOpacity
              style={[styles.filterButton, selectedType === 'all' && styles.filterButtonActive]}
              onPress={() => setSelectedType('all')}
              activeOpacity={0.8}
            >
              <Text style={[styles.filterButtonText, selectedType === 'all' && styles.filterButtonTextActive]}>
                🏦 All Banks
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.filterButton, selectedType === 'government' && styles.filterButtonActiveGov]}
              onPress={() => setSelectedType('government')}
              activeOpacity={0.8}
            >
              <Text style={[styles.filterButtonText, selectedType === 'government' && styles.filterButtonTextActiveGov]}>
                🏛️ Government
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.filterButton, selectedType === 'private' && styles.filterButtonActivePrivate]}
              onPress={() => setSelectedType('private')}
              activeOpacity={0.8}
            >
              <Text style={[styles.filterButtonText, selectedType === 'private' && styles.filterButtonTextActivePrivate]}>
                🏢 Private
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Enhanced Banks List */}
        <View style={styles.banksContainer}>
          <Text style={styles.banksTitle}>
            📞 {filteredBanks.length} Bank{filteredBanks.length !== 1 ? 's' : ''} Available
          </Text>
          
          {filteredBanks.map((bank, index) => (
            <View key={bank.name} style={[styles.bankCard, { transform: [{ scale: 1 }] }]}>
              <View style={styles.bankHeader}>
                <View style={styles.bankInfo}>
                  <View style={[styles.bankIcon, bank.type === 'government' ? styles.govIcon : styles.privateIcon]}>
                    <Building2 size={24} color={bank.type === 'government' ? '#059669' : '#7c3aed'} />
                    <View style={[styles.bankIconGlow, bank.type === 'government' ? styles.govIconGlow : styles.privateIconGlow]} />
                  </View>
                  <View style={styles.bankDetails}>
                    <Text style={styles.bankName}>{bank.name}</Text>
                    <View style={[styles.bankTypeTag, bank.type === 'government' ? styles.govTag : styles.privateTag]}>
                      <Text style={[styles.bankTypeText, bank.type === 'government' ? styles.govTagText : styles.privateTagText]}>
                        {bank.type === 'government' ? '🏛️ Government Bank' : '🏢 Private Bank'}
                      </Text>
                    </View>
                  </View>
                </View>
                
                <View style={styles.bankActions}>
                  {bank.verified && (
                    <View style={styles.verifiedBadge}>
                      <CheckCircle size={16} color="#059669" />
                      <Text style={styles.verifiedText}>✓ Verified</Text>
                    </View>
                  )}
                  <TouchableOpacity
                    style={styles.expandButton}
                    onPress={() => setExpandedBank(expandedBank === bank.name ? null : bank.name)}
                    activeOpacity={0.7}
                  >
                    {expandedBank === bank.name ? 
                      <ChevronUp size={24} color="#2563eb" /> : 
                      <ChevronDown size={24} color="#2563eb" />
                    }
                  </TouchableOpacity>
                </View>
              </View>

              {/* Primary Toll-Free Numbers */}
              <View style={styles.phoneSection}>
                <View style={styles.phoneSectionHeader}>
                  <Phone size={20} color="#1f2937" />
                  <Text style={styles.phoneSectionTitle}>🆓 Primary Toll-Free Numbers</Text>
                </View>
                <View style={styles.phoneGrid}>
                  {bank.tollFree.slice(0, expandedBank === bank.name ? undefined : 2).map((number) =>
                    renderPhoneButton(number, 'primary')
                  )}
                </View>
                {bank.tollFree.length > 2 && expandedBank !== bank.name && (
                  <TouchableOpacity 
                    style={styles.moreNumbersButton}
                    onPress={() => setExpandedBank(bank.name)}
                  >
                    <Text style={styles.moreNumbers}>
                      📱 +{bank.tollFree.length - 2} more numbers available
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Expanded Details */}
              {expandedBank === bank.name && (
                <View style={styles.expandedContent}>
                  {/* Regular Numbers */}
                  {bank.regular && (
                    <View style={styles.phoneSection}>
                      <View style={styles.phoneSectionHeader}>
                        <Phone size={18} color="#1f2937" />
                        <Text style={styles.phoneSectionTitle}>📞 Regular Numbers</Text>
                      </View>
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
                        <Text style={styles.phoneSectionTitle}>⚡ Special Services</Text>
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
                      <Text style={styles.notesTitle}>💡 Important Notes</Text>
                      <Text style={styles.notesText}>{bank.notes}</Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Enhanced Emergency Tips */}
        <View style={styles.tipsSection}>
          <View style={styles.tipsHeader}>
            <AlertTriangle size={28} color="#f59e0b" />
            <Text style={styles.tipsTitle}>💡 Emergency Banking Tips</Text>
          </View>
          
          <View style={styles.tipsContent}>
            <View style={styles.tipCategory}>
              <Text style={styles.tipCategoryTitle}>📋 Before Calling</Text>
              <Text style={styles.tipText}>• Keep account number ready</Text>
              <Text style={styles.tipText}>• Note transaction details & dates</Text>
              <Text style={styles.tipText}>• Have ID documents accessible</Text>
              <Text style={styles.tipText}>• Prepare screenshots if online issue</Text>
            </View>
            
            <View style={styles.tipCategory}>
              <Text style={styles.tipCategoryTitle}>📞 During the Call</Text>
              <Text style={styles.tipText}>• Always ask for reference number</Text>
              <Text style={styles.tipText}>• Note agent's name & ID</Text>
              <Text style={styles.tipText}>• Be clear about expected resolution</Text>
              <Text style={styles.tipText}>• Follow up if no response in 48 hours</Text>
            </View>
          </View>
        </View>

        {/* Enhanced Footer */}
        <View style={styles.footer}>
          <View style={styles.footerGradient}>
            <Text style={styles.footerTitle}>🛡️ Banking Emergency Resources</Text>
            <Text style={styles.footerText}>
              Always verify numbers on official bank websites • Contact RBI if banks don't respond within 30 days
            </Text>
            <Text style={styles.footerSubtext}>
              This resource is for emergency use only. Always prioritize official bank channels first.
            </Text>
            <View style={styles.footerBadge}>
              <CheckCircle size={16} color="#10b981" />
              <Text style={styles.footerBadgeText}>All numbers verified</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  scrollView: {
    flex: 1,
  },
  emergencyHeader: {
    backgroundColor: '#dc2626',
    paddingHorizontal: 20,
    paddingVertical: 32,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
    overflow: 'hidden',
  },
  headerGradient: {
    backgroundColor: 'rgba(220, 38, 38, 0.95)',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconContainer: {
    position: 'relative',
    marginRight: 20,
  },
  headerIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 16,
    borderRadius: 20,
    zIndex: 2,
  },
  pulseRing: {
    position: 'absolute',
    top: -8,
    left: -8,
    right: -8,
    bottom: -8,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    zIndex: 1,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fecaca',
    marginBottom: 12,
  },
  headerStats: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
    marginLeft: 6,
  },
  rbiSection: {
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 12,
  },
  rbiGradient: {
    backgroundColor: '#1e40af',
    padding: 24,
  },
  rbiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  rbiIconContainer: {
    position: 'relative',
    marginRight: 16,
  },
  rbiIconGlow: {
    position: 'absolute',
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
  },
  rbiTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  rbiContent: {
    flexDirection: 'row',
    gap: 20,
  },
  rbiHelpline: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 20,
  },
  rbiPhoneHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  rbiPhoneTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginLeft: 8,
  },
  rbiPhoneButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    position: 'relative',
  },
  rbiPhoneNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'monospace',
  },
  rbiPhoneLabel: {
    fontSize: 12,
    color: '#bfdbfe',
    marginTop: 4,
  },
  rbiPhoneIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  rbiTiming: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rbiTimingText: {
    fontSize: 12,
    color: '#bfdbfe',
    marginLeft: 6,
  },
  rbiInfo: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 20,
  },
  rbiInfoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 12,
  },
  rbiInfoText: {
    fontSize: 13,
    color: '#bfdbfe',
    marginBottom: 6,
    lineHeight: 18,
  },
  rbiContactMethods: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  rbiContactTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 6,
  },
  rbiContactText: {
    fontSize: 12,
    color: '#bfdbfe',
    marginBottom: 3,
  },
  searchSection: {
    backgroundColor: '#ffffff',
    margin: 20,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '500',
  },
  clearSearch: {
    fontSize: 18,
    color: '#9ca3af',
    fontWeight: 'bold',
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  filterButton: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  filterButtonActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  filterButtonActiveGov: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  filterButtonActivePrivate: {
    backgroundColor: '#7c3aed',
    borderColor: '#7c3aed',
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
  banksTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  bankCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  bankHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  bankInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  bankIcon: {
    padding: 12,
    borderRadius: 16,
    marginRight: 16,
    position: 'relative',
  },
  govIcon: {
    backgroundColor: '#d1fae5',
  },
  privateIcon: {
    backgroundColor: '#e9d5ff',
  },
  bankIconGlow: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 18,
    opacity: 0.3,
  },
  govIconGlow: {
    backgroundColor: '#059669',
  },
  privateIconGlow: {
    backgroundColor: '#7c3aed',
  },
  bankDetails: {
    flex: 1,
  },
  bankName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  bankTypeTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
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
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 12,
  },
  verifiedText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#065f46',
    marginLeft: 6,
  },
  expandButton: {
    padding: 8,
    backgroundColor: '#eff6ff',
    borderRadius: 12,
  },
  phoneSection: {
    marginBottom: 20,
  },
  phoneSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  phoneSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginLeft: 10,
  },
  phoneGrid: {
    gap: 12,
  },
  primaryPhoneButton: {
    backgroundColor: '#2563eb',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  secondaryPhoneButton: {
    backgroundColor: '#f8fafc',
    borderColor: '#cbd5e1',
    borderWidth: 2,
    borderRadius: 16,
    padding: 20,
  },
  specialPhoneButton: {
    backgroundColor: '#fed7aa',
    borderColor: '#fb923c',
    borderWidth: 2,
    borderRadius: 16,
    padding: 20,
  },
  phoneLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ea580c',
    marginBottom: 6,
  },
  phoneButtonContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  phoneNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  phoneIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 8,
    borderRadius: 8,
  },
  primaryPhoneText: {
    color: '#ffffff',
  },
  secondaryPhoneText: {
    color: '#1f2937',
  },
  specialPhoneText: {
    color: '#ea580c',
  },
  tapToCall: {
    fontSize: 12,
    fontWeight: '500',
  },
  moreNumbersButton: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
  },
  moreNumbers: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '600',
    textAlign: 'center',
  },
  expandedContent: {
    borderTopWidth: 2,
    borderTopColor: '#f1f5f9',
    paddingTop: 20,
  },
  notesSection: {
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 20,
    marginTop: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  notesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 10,
  },
  notesText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 22,
  },
  tipsSection: {
    backgroundColor: '#fffbeb',
    margin: 20,
    borderRadius: 20,
    padding: 24,
    borderWidth: 2,
    borderColor: '#fde68a',
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  tipsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#92400e',
    marginLeft: 12,
  },
  tipsContent: {
    gap: 20,
  },
  tipCategory: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
  },
  tipCategoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400e',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 14,
    color: '#92400e',
    marginBottom: 6,
    lineHeight: 22,
  },
  footer: {
    marginTop: 20,
    overflow: 'hidden',
  },
  footerGradient: {
    backgroundColor: '#1f2937',
    padding: 32,
    alignItems: 'center',
  },
  footerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
    textAlign: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#d1d5db',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 12,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  footerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#065f46',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  footerBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
    marginLeft: 6,
  },
});