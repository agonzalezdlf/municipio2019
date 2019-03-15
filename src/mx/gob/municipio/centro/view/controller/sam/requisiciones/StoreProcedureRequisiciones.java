package mx.gob.municipio.centro.view.controller.sam.requisiciones;

import java.sql.Types;
import java.util.HashMap;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.object.StoredProcedure;

public class StoreProcedureRequisiciones extends StoredProcedure {
	
	private static final String SPROC_NAME = "Cnt_OrdenServTrab"; 
	
	public StoreProcedureRequisiciones( DataSource ds ){
		
		super( ds, SPROC_NAME );
		declareParameter( new SqlParameter( "CveDoc", Types.INTEGER) );
		declareParameter( new SqlParameter( "TipoOper", Types.INTEGER) ); 
		//declareParameter( new SqlOutParameter( "Valor", Types.INTEGER ) ); 
		compile();
		
	}
	
	public Map<String, Object> execute(Long cve_req, int tipo){ 
		//final Map<String, Object> inParams = new HashMap<String, Object>(8);
		Map<String, Object> parameters = new HashMap<String, Object>(1);
        parameters.put("CveDoc", cve_req);
        parameters.put("TipoOper", tipo);
        parameters.put("Valor", null);
        Map<String,Object> results = super.execute(parameters);
        System.out.println("Parametros: " + results);
        return results;
	}
	
}
