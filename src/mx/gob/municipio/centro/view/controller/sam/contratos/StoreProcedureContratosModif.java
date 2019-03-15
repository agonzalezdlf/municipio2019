package mx.gob.municipio.centro.view.controller.sam.contratos;

import java.sql.Date;
import java.sql.Types;
import java.util.HashMap;
import java.util.Map;
import javax.sql.DataSource;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.object.StoredProcedure;

import net.sourceforge.jtds.jdbc.DateTime;

public class StoreProcedureContratosModif extends StoredProcedure{

private static final String SPROC_NAME = "Cnt_44_ContratoModif";
	
	public StoreProcedureContratosModif( DataSource datasource ){
		super( datasource, SPROC_NAME );
		declareParameter( new SqlParameter( "CveDoc", Types.INTEGER) );
		declareParameter( new SqlParameter( "TipoOper", Types.INTEGER) ); 
		declareParameter( new SqlParameter( "FechaMov", Types.DATE ) ); 
		declareParameter( new SqlParameter( "ImporteMov", Types.DOUBLE ) ); 
		compile();
	}
	
	public Map execute(Long cve_contrato, int tipo, java.util.Date fechamov, Double importe){ 
		Map<String, Object> parameters = new HashMap<String, Object>(1);
        parameters.put("CveDoc", cve_contrato);
        parameters.put("TipoOper", tipo);
        parameters.put( "FechaMov", fechamov); 
        parameters.put( "ImporteMov", importe); 
        Map<String,Object> results = super.execute(parameters);
        System.out.println("outMap:" + results);
        return results;
	}
	
}
