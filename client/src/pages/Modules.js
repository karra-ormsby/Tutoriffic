import React, { useState, useEffect, useContext } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { SketchPicker } from 'react-color';
import { Form, Input, Button } from 'antd';
import { Row, Col } from 'antd';
import { CREATE_MODULE } from '../utils/mutations';
import { QUERY_MODULES, QUERY_ME } from '../utils/queries';
import ModuleList from '../components/ModuleList';

const Modules = () => {
  const [moduleName, setModuleName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#FFFFFF');
  const [errors, setErrors] = useState({});

  const { data: myData } = useQuery(QUERY_ME);
  const meData = myData?.me;

  const [createModule, { error }] = useMutation(CREATE_MODULE, {
    update(cache, { data: { createModule } }) {
      try {
        const { modules } = cache.readQuery({ query: QUERY_MODULES });
        cache.writeQuery({
          query: QUERY_MODULES,
          data: { modules: [...modules, createModule] },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleModuleChange = (e) => {
    setModuleName(e.target.value);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
  };

  const handleSave = async () => {
    // Perform form validation before saving the module
    const validationErrors = {};
    if (!moduleName.trim()) {
      validationErrors.moduleName = 'Module name is required.';
    }
    if (!selectedColor) {
      validationErrors.selectedColor = 'Module color is required.';
    }

    // If there are validation errors, display them and prevent saving the module
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const dataToSend = { moduleName: moduleName, selectedColor: selectedColor, createdBy: meData._id };

    try {
      const { data } = await createModule({
        variables: { moduleData: dataToSend }
      });

      // Clear form data after successful save
      setModuleName('');
      setSelectedColor('#FFFFFF');
      setErrors({});
    } catch (error) {
      // Handle error here if needed
      console.error(error);
    }
  };

  const { data, loading, refetch } = useQuery(QUERY_MODULES);
  const modules = data?.modules || [];

  useEffect(() => {
    refetch();
  }, [refetch]);

  const styles = {
    moduleBox: {
      backgroundColor: '#f5f5f5',
      border: '1px solid #ddd',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      padding: '2rem',
      textAlign: 'center',
      zIndex: 1,
      borderRadius: '5px'
    },
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh', marginTop: '64px' }}>
      {/* Add a margin-top to create space between the navbar and the module content */}
      <Col xs={24} sm={20} md={16} lg={12} xl={16}>
        <div style={styles.moduleBox}>
          <h2>Modules</h2>
          <Form>
            <Form.Item
              label={<span style={{ fontSize: '1.15rem', fontStyle: 'italic' }}>Module Name</span>}
              rules={[
                {
                  required: true,
                  message: 'Please input a Module Name!',
                },
              ]}
              validateStatus={errors.moduleName ? 'error' : ''}
              help={errors.moduleName}
            >
              <Input value={moduleName} onChange={handleModuleChange} />
            </Form.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <p>What colour would you like the module card to be?</p>
                {errors.selectedColor && <span style={{ color: 'red', marginLeft: '10px' }}>{errors.selectedColor}</span>}
              </div>
              <SketchPicker color={selectedColor} onChange={handleColorChange} />
            </div>

            <Button className='enlarge' style={{backgroundColor: "#e67e22", color: "#fff", boxShadow: '2px 2px 10px rgb(216, 215, 215)', marginBottom: "2rem", fontSize: "1.15rem", paddingBottom: "2rem", borderRadius: '5px'}} onClick={handleSave}>Create Module</Button>
          </Form>

          <div>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <ModuleList />
            )}
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Modules;


